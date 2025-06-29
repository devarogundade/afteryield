<script setup lang="ts">
import type { AfterYieldAgent, AssetType } from '@/scripts/types';
import { useDataStore } from '@/stores/data';
import { ref, onUnmounted } from 'vue';
import { zeroAddress, type Hex } from 'viem';
import { AccountContract } from '@/scripts/contracts';
import { useRouter } from 'vue-router';
import { notify } from '@/reactives/notify';
import ProgressBox from '@/components/ProgressBox.vue';

const router = useRouter();
const dataStore = useDataStore();
const currentAudio = ref<HTMLAudioElement | null>(null);
const currentlyPlayingAgent = ref<string | null>(null);

const addingAgent = ref<Hex | null>(null);
const removingAgent = ref<Hex | null>(null);

const pauseOrBioAudio = (agent: AfterYieldAgent, e: any) => {
    e.preventDefault();

    // If same agent clicked again, toggle pause
    if (currentlyPlayingAgent.value === agent.address) {
        currentAudio.value?.pause();
        currentlyPlayingAgent.value = null;
        return;
    }

    // If another audio is playing, stop it first
    if (currentAudio.value) {
        currentAudio.value.pause();
        currentAudio.value = null;
    }

    const audio = new Audio(agent.bioAudio);
    audio.play();
    currentAudio.value = audio;
    currentlyPlayingAgent.value = agent.address;

    // Clear state when audio ends
    audio.onended = () => {
        currentAudio.value = null;
        currentlyPlayingAgent.value = null;
    };
};

const getAccountAgents = async () => {
    if (!dataStore.account || dataStore.agents.length == 0) return;

    const agents = await AccountContract.getAgents(dataStore.account);
    if (agents) dataStore.setAccountAgents(agents);
};

const removeFromAccount = async (agent: AfterYieldAgent, e: any) => {
    e.preventDefault();

    if (removingAgent.value) return;
    removingAgent.value = agent.address;

    if (dataStore.account == zeroAddress) {
        return router.push('/account');
    }

    const txHash = await AccountContract.removeAgents(dataStore.account, [agent.address]);

    if (txHash) {
        notify.push({
            title: 'Agent removed from account',
            description: 'Transaction sent',
            category: 'success'
        });

        getAccountAgents();
    }
    else {
        notify.push({
            title: 'Failed to remove agent',
            description: 'Transaction failed',
            category: 'error'
        });
    }

    removingAgent.value = null;
};

const addToAccount = async (agent: AfterYieldAgent, e: any) => {
    e.preventDefault();

    if (addingAgent.value) return;
    addingAgent.value = agent.address;

    if (dataStore.account == zeroAddress) {
        return router.push('/account');;
    }

    const txHash = await AccountContract.addAgents(dataStore.account, [agent.address]);

    if (txHash) {
        notify.push({
            title: 'Agent added to account',
            description: 'Transaction sent',
            category: 'success'
        });

        getAccountAgents();
    }
    else {
        notify.push({
            title: 'Failed to add agent',
            description: 'Transaction failed',
            category: 'error'
        });
    }

    addingAgent.value = null;
};

onUnmounted(() => {
    currentAudio.value?.pause();
    currentAudio.value = null;
    currentlyPlayingAgent.value = null;
});
</script>

<template>
    <section>
        <div class="app_width">
            <div class="filter">
                <div class="search">
                    <i class="fi fi-rs-search"></i>
                    <input type="text" placeholder="Search by agent name or traits">
                </div>
                <div class="tab_right">
                    <div class="tabs">
                        <button class="tab_active tab">All</button>
                        <button class="tab">Starred</button>
                        <button class="tab">My agents</button>
                    </div>

                    <div class="tabs">
                        <button class="tab">Male</button>
                        <button class="tab">Female</button>
                        <button class="tab">Others</button>
                    </div>

                    <button class="clear">
                        <i class="fi fi-rs-cross-small"></i>
                        Clear all filters
                    </button>
                </div>

            </div>
            <div class="agents" v-if="dataStore.agents.length > 0">
                <RouterLink v-for="agent in dataStore.agents" :key="agent.address" :to="`/agents/${agent.address}`">
                    <div class="agent">
                        <div class="agent_info">
                            <img :src="agent.image" alt="">
                            <div class="agent_name">
                                <h3>{{ agent.name }}</h3>
                                <p>{{ agent.bio[0] }}.</p>
                                <span>{{ agent.gender }}</span>
                            </div>
                        </div>
                        <div class="tab_right">
                            <div class="stats">
                                <div class="stat">
                                    <h3>AVG. APY</h3>
                                    <p>0%</p>
                                </div>

                                <div class="stat">
                                    <h3>Managing</h3>
                                    <p>$29.80M</p>
                                </div>

                                <div class="stat">
                                    <h3>LLM</h3>
                                    <p>{{ agent.model }}</p>
                                </div>

                                <div class="stat">
                                    <h3>Vaults</h3>
                                    <p>{{ agent.vaults.length }}</p>
                                </div>

                                <div class="stat" v-tooltip:top="`ElizaOS, Chainlink functions and automation.`">
                                    <h3>Services</h3>
                                    <div class="images">
                                        <img src="/images/chainlink.png" alt="chainlink">
                                        <img src="/images/elizaos.png" alt="elizaos">
                                    </div>
                                </div>

                                <div class="stat">
                                    <h3>Risk factor <i v-tooltip:top="`0 means low risk, 1 means high risk value.`"
                                            class="fi fi-rs-info"></i>
                                    </h3>
                                    <p>{{ agent.riskFactor }}</p>
                                </div>
                            </div>

                            <div class="actions">
                                <button class="play" @click="pauseOrBioAudio(agent, $event)">
                                    <i v-if="currentlyPlayingAgent == agent.address" class="fi fi-rs-pause"></i>
                                    <i v-else class="fi fi-rs-play"></i>
                                    Bio
                                </button>

                                <button
                                    v-if="dataStore.accountAgents.find(a => a.address === agent.address) == undefined"
                                    class="use" @click="addToAccount(agent, $event)">{{
                                        addingAgent == agent.address ? 'Adding' : 'Add to account' }}</button>

                                <button v-else class="use" @click="removeFromAccount(agent, $event)">{{
                                    removingAgent == agent.address ? 'Removing' : 'Remove from account' }}</button>

                                <div class="star"><i class="fi fi-rs-star"></i></div>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>

            <ProgressBox v-else />
        </div>
    </section>
</template>

<style scoped>
.filter {
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
}

.search {
    width: fit-content;
    border: 1px solid var(--bg-lightest);
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 16px;
    font-size: 14px;
    color: var(--tx-semi);
}

.search input {
    width: 300px;
    background: none;
    border: none;
    outline: none;
    color: var(--tx-normal);
    height: 36px;
}

.tab_right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.tabs {
    border: 1px solid var(--bg-lightest);
    border-radius: 6px;
    overflow: hidden;
}

.tab {
    height: 32px;
    padding: 0 12px;
    background: none;
    border: none;
    font-size: 14px;
    color: var(--tx-dimmed);
    cursor: pointer;
}

.tab_active {
    color: var(--primary-light);
    background: var(--bg-lightest);
}

.clear {
    height: 36px;
    padding: 0 12px;
    background: none;
    border: 1px solid var(--bg-lightest);
    border-radius: 6px;
    font-size: 14px;
    color: var(--tx-dimmed);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
}

.agents {
    background: var(--bg-lightest);
    border-radius: 16px;
    margin-bottom: 40px;
}

.agent {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--bg);
}

.agent_info {
    display: flex;
    gap: 16px;
}

.agent_info h3 {
    color: var(--tx-normal);
    font-weight: 500;
    font-size: 18px;
}

.agent_info p {
    color: var(--tx-semi);
    font-size: 14px;
    margin: 8px 0;
    max-width: 340px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
}

.agent_info span {
    color: var(--accent-green);
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 4px;
    background: var(--bg);
}

.agent_info img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50px;
}

.stats {
    display: flex;
    gap: 50px;
}

.stat {
    min-width: 90px;
}

.images {
    display: flex;
    align-items: center;
    gap: 4px;
}

.stat h3 {
    font-size: 14px;
    color: var(--tx-dimmed);
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 8px;
}

.stat p {
    margin-top: 10px;
    font-size: 20px;
    color: var(--tx-normal);
    font-weight: 500;
}

.stat img {
    margin-top: 10px;
    width: 24px;
    height: 24px;
    border-radius: 20px;
}

.agents .tab_right {
    gap: 60px;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
}

.play {
    padding: 0 20px;
    height: 50px;
    background: var(--tx-normal);
    border-radius: 50px;
    border: none;
    font-size: 14px;
    color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
}


.use {
    min-width: 200px;
    padding: 0 20px;
    height: 50px;
    background: var(--primary-light);
    border-radius: 50px;
    border: none;
    font-size: 14px;
    color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
}

.star {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: var(--tx-dimmed);
    cursor: pointer;
}
</style>