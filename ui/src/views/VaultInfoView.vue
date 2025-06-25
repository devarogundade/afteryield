<script setup lang="ts">
import { Clients } from '@/scripts/clients';
import type { AfterYieldAgent, VaultInfo } from '@/scripts/types';
import { useDataStore } from '@/stores/data';
import type { Hex } from 'viem';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const dataStore = useDataStore();

const vault = ref<VaultInfo | undefined>(undefined);
const agent = ref<AfterYieldAgent | undefined>(undefined);

const getVault = async (address: Hex) => {
    vault.value = await Clients.getVault(address); getAgent();

};

const getAgent = () => {
    if (vault.value?.agentAddress) {
        agent.value = dataStore.agents.find((agent) => agent.address == vault.value?.agentAddress);
    }
};

watch(computed(() => dataStore.agents), () => {
    getAgent();
});

onMounted(() => {
    const vaultAddress = route.params?.id?.toString();
    if (!vaultAddress) return;

    getVault(vaultAddress as Hex);
});
</script>

<template>
    <section>
        <div class="app_width" v-if="vault && agent">
            <div class="vault_title">
                <div class="title_left">
                    <div class="images">
                        <img src="/images/chainlink.png" alt="">
                    </div>
                    <h3>{{ vault.name }}</h3>
                </div>

                <div class="title_right">
                    <div class="actions">
                        <button class="mode">Turn On Autopilot</button>
                        <div class="star"><i class="fi fi-rs-star"></i></div>
                    </div>
                </div>
            </div>

            <div class="vault_info">
                <div class="stats">
                    <div class="stat">
                        <h3>TVL <i class="fi fi-rs-info"></i></h3>
                        <p>$1,000</p>
                        <span>$100,000</span>
                    </div>

                    <div class="stat">
                        <h3>APY <i class="fi fi-rs-info"></i></h3>
                        <p>20.34%</p>
                    </div>

                    <div class="stat">
                        <h3>Daily</h3>
                        <p>0.2837%</p>
                    </div>

                    <div class="stat">
                        <h3>Maintained by</h3>
                        <p>{{ agent.name }}</p>
                    </div>
                </div>

                <div class="stats">
                    <div class="stat">
                        <h3>Your Deposit</h3>
                        <p>0</p>
                    </div>

                    <div class="stat">
                        <h3>Last harvest <i class="fi fi-rs-info"></i></h3>
                        <p>17 hours ago</p>
                    </div>
                </div>

                <div class="chart">
                    <div class="chart_head">
                        <h3>Historical rate</h3>
                        <div class="tabs">
                            <button class="tab tab_active">APY</button>
                            <button class="tab">TVL</button>
                            <button class="tab">Price</button>
                        </div>
                    </div>

                    <div class="graph"></div>

                    <div class="chart_info">
                        <div class="averages">
                            <div class="average">
                                <p>AVERAGE</p>
                            </div>

                            <div class="average">
                                <p>MOVING AVERAGE</p>
                            </div>
                        </div>

                        <div class="timeranges">
                            <button class="timerange">1D</button>
                            <button class="timerange">1W</button>
                            <button class="timerange">1M</button>
                            <button class="timerange timerange_active">1Y</button>
                        </div>
                    </div>
                </div>

                <div class="cashier">
                    <div class="cashier_head">
                        <button class="button_active">Deposit</button>
                        <button>Withdraw</button>
                    </div>
                </div>

                <div class="lp_info">
                    <div class="lp_info_head">
                        <h3>LP Breakdown</h3>

                        <div class="tabs">
                            <button class="tab">1LP</button>
                            <button class="tab tab_active">Total Pool</button>
                        </div>
                    </div>
                </div>

                <div class="agent">
                    <div class="agent_head">
                        <h3>Agent</h3>

                        <RouterLink to="/agents/0x1111">
                            <button>View agent</button>
                        </RouterLink>
                    </div>
                </div>

                <div class="strategies">
                    <div class="strategies_head">
                        <h3>Strategies</h3>

                        <div class="tabs">
                            <button class="tab tab_active">In use</button>
                            <button class="tab">All strategies</button>
                        </div>
                    </div>
                </div>

                <div class="safety">
                    <div class="safety_head">
                        <h3>Safety Score</h3>
                    </div>
                </div>

                <div class="vault_details">
                    <div class="vault_details_head">
                        <h3>Details</h3>

                        <div class="tabs">
                            <button class="tab tab_active">Assets</button>
                            <button class="tab">Platform</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.vault_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
}

.title_left {
    display: flex;
    align-items: center;
    gap: 16px;
}

.title_left .images {
    display: flex;
    align-items: center;
}

.title_left img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
}

.title_left h3 {
    font-size: 30px;
    font-weight: 500;
    color: var(--tx-normal);
}

.title_right {
    display: flex;
    align-items: center;
    gap: 16px;
}

.vault_title .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
}

.vault_title .mode {
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


.vault_title .star {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: var(--tx-dimmed);
    cursor: pointer;
    background: var(--bg-lighter);
    padding: 10px;
    border-radius: 6px;
}

.vault_info {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 500px;
    gap: 20px;
    margin-bottom: 40px;
}

.stats {
    display: flex;
    background: var(--bg-lighter);
    border-radius: 6px;
}

.stat {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 24px;
}

.stat h3 {
    font-size: 14px;
    color: var(--tx-dimmed);
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 4px;
}

.stat p {
    margin-top: 4px;
    font-size: 14px;
    color: var(--tx-normal);
    font-weight: 500;
}

.stat span {
    font-size: 12px;
    color: var(--tx-dimmed);
    font-weight: 500;
}

.stat:not(:last-child) {
    border-right: 1px solid var(--bg);
}

.chart {
    background: var(--bg-lighter);
    border-radius: 6px;
    overflow: hidden;
}

.chart_head {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 1px solid var(--bg);
}

.chart_head h3 {
    color: var(--tx-semi);
    font-weight: 500;
    font-size: 18px;
}

.tabs {
    border: 1px solid var(--bg-light);
    background: var(--bg-light);
    border-radius: 6px;
    overflow: hidden;
}

.tab {
    height: 30px;
    padding: 0 10px;
    background: none;
    border: none;
    font-size: 12px;
    color: var(--tx-dimmed);
    cursor: pointer;
}

.tab_active {
    color: var(--primary-light);
    background: var(--bg-lightest);
}

.graph {
    height: 300px;
}

.chart_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 24px;
    border-top: 1px solid var(--bg);
}

.averages {
    display: flex;
    align-items: center;
    gap: 10px;
}

.timeranges {
    display: flex;
    align-items: center;
    gap: 10px;
}

.timerange {
    background: none;
    border: none;
    font-size: 14px;
    color: var(--tx-dimmed);
    cursor: pointer;
}

.timerange:hover {
    color: var(--tx-semi);
}

.timerange_active {
    color: var(--tx-normal);
}

.cashier {
    background: var(--bg-lighter);
    border-radius: 6px;
    overflow: hidden;
}

.cashier_head {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--bg);
}

.cashier_head button {
    height: 60px;
    width: 100%;
    background: none;
    border: none;
    font-size: 16px;
    color: var(--tx-dimmed);
    cursor: pointer;
}

.cashier_head .button_active {
    color: var(--tx-normal);
    border-bottom: 1px solid var(--primary-light);
}

.lp_info {
    background: var(--bg-lighter);
    border-radius: 6px;
    overflow: hidden;
}

.lp_info_head {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 1px solid var(--bg);
}

.lp_info_head h3 {
    color: var(--tx-semi);
    font-weight: 500;
    font-size: 18px;
}

.agent {
    background: var(--bg-lighter);
    border-radius: 6px;
    overflow: hidden;
}

.agent_head {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 1px solid var(--bg);
}

.agent_head h3 {
    color: var(--tx-semi);
    font-weight: 500;
    font-size: 18px;
}

.agent_head button {
    padding: 0 20px;
    height: 40px;
    background: var(--bg-lightest);
    border: none;
    border-radius: 50px;
    font-size: 14px;
    color: var(--tx-semi);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
}

.strategies {
    background: var(--bg-lighter);
    border-radius: 6px;
    overflow: hidden;
}

.strategies_head {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 1px solid var(--bg);
}

.strategies_head h3 {
    color: var(--tx-semi);
    font-weight: 500;
    font-size: 18px;
}

.safety {
    background: var(--bg-lighter);
    border-radius: 6px;
    overflow: hidden;
}

.safety_head {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 1px solid var(--bg);
}

.safety_head h3 {
    color: var(--tx-semi);
    font-weight: 500;
    font-size: 18px;
}

.vault_details {
    background: var(--bg-lighter);
    border-radius: 6px;
    overflow: hidden;
}

.vault_details_head {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 1px solid var(--bg);
}

.vault_details_head h3 {
    color: var(--tx-semi);
    font-weight: 500;
    font-size: 18px;
}
</style>