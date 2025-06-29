<script setup lang="ts">
import ProgressBox from '@/components/ProgressBox.vue';
import { notify } from '@/reactives/notify';
import { Clients } from '@/scripts/clients';
import { AccountContract } from '@/scripts/contracts';
import Converter from '@/scripts/converter';
import type { AfterYieldAgent } from '@/scripts/types';
import { useBalanceStore } from '@/stores/balance';
import { useDataStore } from '@/stores/data';
import { zeroAddress, type Hex } from 'viem';
import { onMounted, ref, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const dataStore = useDataStore();
const balanceStore = useBalanceStore();
const agent = ref<AfterYieldAgent | undefined>(undefined);

const currentAudio = ref<HTMLAudioElement | null>(null);
const currentlyPlayingAgent = ref<string | null>(null);

const addingAgent = ref(false);
const removingAgent = ref(false);

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

const addToAccount = async (agent: AfterYieldAgent) => {
    if (addingAgent.value) return;
    addingAgent.value = true;

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

    addingAgent.value = false;
};

const removeFromAccount = async (agent: AfterYieldAgent) => {
    if (removingAgent.value) return;
    removingAgent.value = true;

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

    removingAgent.value = false;
};

const getAgent = async (address: Hex) => {
    agent.value = await Clients.getAgent(address);
};

onUnmounted(() => {
    currentAudio.value?.pause();
    currentAudio.value = null;
    currentlyPlayingAgent.value = null;
});

onMounted(() => {
    const agentAddress = route.params?.id?.toString();
    if (!agentAddress) return;

    getAgent(agentAddress as Hex);
});
</script>

<template>
    <section>
        <div class="app_width" v-if="agent">
            <div class="stats">
                <div class="agent">
                    <div class="agent_info">
                        <img :src="agent.image" :alt="agent.name">
                        <div class="name">
                            <h3>{{ agent.name }}</h3>

                            <div class="address">{{ agent.address }}
                                <i class="fi fi-rs-copy"></i>
                            </div>
                            <p class="bio">{{ agent.bio[0] }}</p>
                            <p class="traits">{{ agent.traits.join(', ') }}</p>

                            <span>{{ agent.gender }}</span>
                        </div>
                    </div>
                </div>

                <div class="info_right">
                    <div class="actions"> <button class="play" @click="pauseOrBioAudio(agent, $event)">
                            <i v-if="currentlyPlayingAgent == agent.address" class="fi fi-rs-pause"></i>
                            <i v-else class="fi fi-rs-play"></i>
                            Bio
                        </button>

                        <button v-if="dataStore.accountAgents.find(a => a.address === agent?.address) == undefined"
                            class="use" @click="addToAccount(agent)">{{
                                addingAgent ? 'Adding' : 'Add to account' }}</button>

                        <button v-else class="use" @click="removeFromAccount(agent)">{{
                            removingAgent ? 'Removing' : 'Remove from account' }}</button>

                        <div class="star"><i class="fi fi-rs-star"></i></div>
                    </div>

                    <div class="platform">
                        <div class="platform_title">
                            <h3>Statistics</h3>
                        </div>

                        <div class="platform_stats">
                            <div class="stat">
                                <h3>
                                    Managing
                                    <i class="fi fi-rs-info"></i>
                                </h3>

                                <p>$270.80M</p>
                            </div>

                            <div class="stat">
                                <h3>AVG. APY</h3>
                                <p>0%</p>
                            </div>

                            <div class="stat">
                                <h3>Vaults</h3>
                                <p>{{ agent.vaults.length }}</p>
                            </div>

                            <div class="stat">
                                <h3>Risk factor</h3>
                                <p>{{ agent.riskFactor }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="vaults">
                <div class="vaults_toolbar">
                    <div class="tab_left">
                        <h3>Vaults</h3>
                        <div class="tabs">
                            <button class="tab_active tab">All</button>
                            <button class="tab">Starred</button>
                            <button class="tab">My positions</button>
                        </div>

                        <div class="tabs">
                            <button class="tab">Stablecoins</button>
                            <button class="tab">Blue Chips</button>
                            <button class="tab">Memes</button>
                        </div>
                    </div>

                    <div class="tab_right">
                        <button class="clear">
                            <i class="fi fi-rs-cross-small"></i>
                            Clear all filters
                        </button>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>
                                <div class="search">
                                    <i class="fi fi-rs-search"></i>
                                    <input type="text" placeholder="Search by asset name">
                                </div>
                            </th>
                            <th>Wallet</th>
                            <th>Shares LP</th>
                            <th>AVG. Current APY</th>
                            <th>AVG. Daily</th>
                            <th>TVL</th>
                            <th>Safety</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="vault in agent.vaults" :key="vault.address"
                            @click="router.push(`/vaults/${vault.address}`)">
                            <td>
                                <div class="vault_detail">
                                    <img :src="vault.image" :alt="vault.name">
                                    {{ vault.name }}
                                </div>
                            </td>
                            <td>
                                {{ Converter.toMoney(balanceStore.userBalances[vault.asset.address]) }}
                            </td>
                            <td>
                                {{ Converter.toMoney(balanceStore.userBalances[vault.address]) }}
                            </td>
                            <td>
                                {{
                                    (vault.allSupportedStrategies.reduce((a, b) => a + b.apy, 0) /
                                        vault.allSupportedStrategies.length
                                    ) / 100}}%
                            </td>
                            <td>
                                {{
                                    (vault.allSupportedStrategies.reduce((a, b) => a + b.dailyApy, 0) /
                                        vault.allSupportedStrategies.length) / 100
                                }}%
                            </td>
                            <td>
                                {{vault.allSupportedStrategies.reduce((a, b) => a + b.tvl, 0)}} {{ vault.asset.symbol }}
                            </td>
                            <td>
                                <div class="safety">
                                    <p>
                                        {{
                                            vault.allSupportedStrategies.reduce((a, b) => a + b.safety, 0) /
                                            vault.allSupportedStrategies.length
                                        }} of 100
                                    </p>
                                    <i v-tooltip:top="`Very safe.`" class="fi fi-rs-shield-trust"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="end" v-if="dataStore.agents.length > 0">That's all. More vaults soon.</div>

            </div>
        </div>

        <ProgressBox v-else />
    </section>
</template>


<style scoped>
.stats {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 40px 0;
}

.agent_info {
    display: flex;
    gap: 24px;
}

.agent_info img {
    width: 240px;
    height: 240px;
    border-radius: 120px;
    object-fit: cover;
}


.agent_info .name h3 {
    font-size: 30px;
    color: var(--tx-normal);
    font-weight: 500;
    margin-top: 20px;
}

.agent_info .name .address {
    margin-top: 4px;
    font-size: 12px;
    color: var(--tx-dimmed);
    border: 1px solid var(--bg-lighter);
    border-radius: 6px;
    padding: 4px 10px;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 8px;
}

.agent_info .name .bio {
    margin-top: 10px;
    font-size: 16px;
    color: var(--tx-semi);
}

.agent_info .name .traits {
    margin-top: 10px;
    font-size: 14px;
    color: var(--tx-dimmed);
    margin-bottom: 10px;
}

.agent_info .name span {
    color: var(--accent-green);
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 4px;
    background: var(--bg-lighter);
}

.info_right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 40px;
}

.actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
}

.platform_stats {
    margin-top: 10px;
    display: flex;
    gap: 24px;
}

.platform_title h3 {
    font-weight: 400;
    font-size: 26px;
    color: var(--tx-semi);
}

.platform {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.platform_stats {
    justify-content: flex-end;
    text-align: right;
}

.stat h3 {
    font-size: 14px;
    color: var(--tx-dimmed);
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
}

.stat p {
    margin-top: 10px;
    font-size: 24px;
    color: var(--tx-normal);
    font-weight: 500;
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

.vaults {
    background: var(--bg-lighter);
    border-radius: 20px 20px 0 0;
    overflow: hidden;
    min-height: calc(100vh - 100px);
}

.vaults_toolbar {
    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg-lightest);
}

.tab_left {
    display: flex;
    align-items: center;
    gap: 20px;
}

.tab_left h3 {
    font-size: 24px;
    color: var(--tx-normal);
    font-weight: 500;
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

.tab_right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.agent_active img {
    border: 2px solid var(--primary-light);
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

table {
    width: 100%;
    border-collapse: collapse;
}

thead th {
    padding: 16px 24px;
    font-size: 12px;
    color: var(--tx-semi);
    font-weight: 400;
    text-transform: uppercase;
    text-align: left;
}

thead th:last-child {
    text-align: right;
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
    font-size: 14px;
    color: var(--tx-normal);
    height: 36px;
}

tbody tr {
    height: 80px;
    background: var(--bg-lightest);
    border-bottom: 1px solid var(--bg-lighter);
    cursor: pointer;
}

tbody td {
    padding: 16px 24px;
    font-size: 14px;
    color: var(--tx-semi);
    font-weight: 400;
    position: relative;
}

.vault_detail {
    display: flex;
    align-items: center;
    gap: 10px;
}

.vault_detail img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    object-fit: cover;
}

.vault_agent {
    display: flex;
    align-items: center;
    gap: 10px;
}

.vault_agent img {
    height: 34px;
    width: 34px;
    object-fit: cover;
    border-radius: 20px;
}

.safety {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
}

.end {
    margin-top: 40px;
    font-size: 12px;
    color: var(--tx-normal);
    text-align: center;
}
</style>