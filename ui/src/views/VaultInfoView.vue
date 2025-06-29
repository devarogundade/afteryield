<script setup lang="ts">
import Chart from '@/components/Chart.vue';
import ProgressBox from '@/components/ProgressBox.vue';
import { notify } from '@/reactives/notify';
import { Clients } from '@/scripts/clients';
import { getTokens } from '@/scripts/constants';
import { VaultContract } from '@/scripts/contracts';
import Converter from '@/scripts/converter';
import { TokenContract } from '@/scripts/erc20';
import type { AfterYieldAgent, ChartData, VaultInfo } from '@/scripts/types';
import { useBalanceStore } from '@/stores/balance';
import { useDataStore } from '@/stores/data';
import { useWalletStore } from '@/stores/wallet';
import { formatUnits, parseEther, parseUnits, type Hex } from 'viem';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const dataStore = useDataStore();
const walletStore = useWalletStore();
const balanceStore = useBalanceStore();

const amount = ref(0);
const depositing = ref(false);
const withdrawing = ref(false);

const tabs = ref({
    rate: 'apy' as 'apy' | 'tvl' | 'price',
    lp: 'total' as 'lp' | 'total',
    strategies: 'in-use' as 'in-use' | 'all',
    detail: 'asset' as 'asset' | 'platform' | 'rewards'
});

const chartData = ref<ChartData[]>([{
    name: Intl.DateTimeFormat('en-US', {
        minute: '2-digit',
        hour: '2-digit'
    }).format(new Date(Date.now() - 420000)),
    pl: 63
},
{
    name: Intl.DateTimeFormat('en-US', {
        minute: '2-digit',
        hour: '2-digit'
    }).format(new Date(Date.now() - 380000)),
    pl: 45
}, {
    name: Intl.DateTimeFormat('en-US', {
        minute: '2-digit',
        hour: '2-digit'
    }).format(new Date(Date.now() - 310000)),
    pl: 34
}, {
    name: Intl.DateTimeFormat('en-US', {
        minute: '2-digit',
        hour: '2-digit'
    }).format(new Date(Date.now() - 240000)),
    pl: 40
}, {
    name: Intl.DateTimeFormat('en-US', {
        minute: '2-digit',
        hour: '2-digit'
    }).format(new Date(Date.now() - 200000)),
    pl: 50
}, {
    name: Intl.DateTimeFormat('en-US', {
        minute: '2-digit',
        hour: '2-digit'
    }).format(new Date(Date.now() - 100000)),
    pl: 25
}, {
    name: Intl.DateTimeFormat('en-US', {
        minute: '2-digit',
        hour: '2-digit'
    }).format(new Date()),
    pl: 75
},
]);

const setModeFor = async () => { };

const isDeposit = ref(true);

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

const getUserTokenBalances = async () => {
    if (!walletStore.address) return;

    for (let index = 0; index < getTokens.length; index++) {
        const balance = await TokenContract.getTokenBalance(
            getTokens[index].address,
            walletStore.address
        );

        balanceStore.setUserBalance(
            getTokens[index].address,
            Number(formatUnits(balance, getTokens[index].decimals))
        );
    }
};

const getUserVaultTokenBalances = async () => {
    if (!walletStore.address || dataStore.vaults.length === 0) return;

    for (let index = 0; index < dataStore.vaults.length; index++) {
        const balance = await TokenContract.getTokenBalance(
            dataStore.vaults[index].address,
            walletStore.address
        );

        balanceStore.setUserBalance(dataStore.vaults[index].address, Number(formatUnits(balance, dataStore.vaults[index].asset.decimals)));
    }
};

const deposit = async () => {
    if (!vault.value) return;
    if (depositing.value) return;
    depositing.value = true;

    if (amount.value === 0) {
        return;
    }

    const approvalTxHash = await TokenContract.approve(
        vault.value.asset.address,
        vault.value.address,
        parseUnits(amount.value.toString(), vault.value.asset.decimals)
    );

    if (!approvalTxHash) {
        notify.push({
            title: 'Token approval failed',
            description: 'Transaction failed',
            category: 'error'
        });
        depositing.value = false;
        return;
    }

    const txHash = await VaultContract.deposit(
        vault.value.address,
        parseUnits(amount.value.toString(), vault.value.asset.decimals)
    );

    if (txHash) {
        notify.push({
            title: 'Token deposited',
            description: 'Transaction sent',
            category: 'success'
        });

        getUserVaultTokenBalances();
        getUserTokenBalances();
    } else {
        notify.push({
            title: 'Token deposit failed',
            description: 'Transaction failed',
            category: 'error'
        });
    }

    depositing.value = false;
};

const withdraw = async () => {
    if (!vault.value) return;
    if (withdrawing.value) return;
    withdrawing.value = true;

    if (amount.value === 0) {
        return;
    }

    const approvalTxHash = await TokenContract.approve(
        vault.value.address,
        vault.value.address,
        parseEther(amount.value.toString())
    );

    if (!approvalTxHash) {
        notify.push({
            title: 'LP token approval failed',
            description: 'Transaction failed',
            category: 'error'
        });
        withdrawing.value = false;
        return;
    }

    const txHash = await VaultContract.withdraw(
        vault.value.address,
        parseEther(amount.value.toString())
    );

    if (txHash) {
        notify.push({
            title: 'Token withdrawn',
            description: 'Transaction sent',
            category: 'success'
        });

        getUserVaultTokenBalances();
        getUserTokenBalances();

        amount.value = 0;
    } else {
        notify.push({
            title: 'Token withdraw failed',
            description: 'Transaction failed',
            category: 'error'
        });
    }

    withdrawing.value = false;
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
                        <img :src="vault.image" alt="">
                    </div>
                    <h3>{{ vault.name }}</h3>
                </div>

                <div class="title_right">
                    <div class="actions">
                        <button class="mode" @click="setModeFor">Turn On Autopilot</button>
                        <div class="star"><i class="fi fi-rs-star"></i></div>
                    </div>
                </div>
            </div>

            <div class="vault_info">
                <div class="stats">
                    <div class="stat">
                        <h3>TVL <i class="fi fi-rs-info"></i></h3>
                        <p>{{vault.allSupportedStrategies.reduce((a, b) => a + b.tvl, 0)}} {{ vault.asset.symbol }}
                        </p>
                        <!-- <span>$100,000</span> -->
                    </div>

                    <div class="stat">
                        <h3>APY <i class="fi fi-rs-info"></i></h3>
                        <p>{{
                            (vault.allSupportedStrategies.reduce((a, b) => a + b.apy, 0) /
                                vault.allSupportedStrategies.length
                            ) / 100}}%
                        </p>
                    </div>

                    <div class="stat">
                        <h3>Daily</h3>
                        <p>
                            {{
                                (vault.allSupportedStrategies.reduce((a, b) => a + b.dailyApy, 0) /
                                    vault.allSupportedStrategies.length) / 100
                            }}%
                        </p>
                    </div>

                    <div class="stat">
                        <h3>Maintained by</h3>
                        <p>{{ agent.name }}</p>
                    </div>
                </div>

                <div class="stats">
                    <div class="stat">
                        <h3>Your Deposit</h3>
                        <p>
                            {{ Converter.toMoney(balanceStore.userBalances[vault.address]) }}
                        </p>
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
                            <button @click="tabs.rate = 'apy'"
                                :class="tabs.rate === 'apy' ? 'tab tab_active' : 'tab'">APY</button>
                            <button @click="tabs.rate = 'tvl'"
                                :class="tabs.rate === 'tvl' ? 'tab tab_active' : 'tab'">TVL</button>
                            <button @click="tabs.rate = 'price'"
                                :class="tabs.rate === 'price' ? 'tab tab_active' : 'tab'">Price</button>
                        </div>
                    </div>

                    <div class="graph">
                        <Chart :data="chartData" :marker="true" />
                    </div>

                    <div class="chart_info">
                        <div class="averages">
                            <div class="average">
                                <p>AVERAGE</p>
                            </div>
                        </div>

                        <div class="timeranges">
                            <button class="timerange timerange_active">1D</button>
                            <button class="timerange">1W</button>
                            <button class="timerange">1M</button>
                            <button class="timerange">1Y</button>
                        </div>
                    </div>
                </div>

                <div class="cashier">
                    <div class="cashier_head">
                        <button @click="isDeposit = true" :class="isDeposit ? 'button_active' : ''">Deposit</button>
                        <button @click="isDeposit = false" :class="isDeposit ? '' : 'button_active'">Withdraw</button>
                    </div>

                    <div class="cash" v-if="isDeposit">
                        <div class="input">
                            <input v-model="amount" type="number" placeholder="0.00">
                            <div class="token">{{ vault.asset.symbol }}</div>
                        </div>

                        <p class="balance">Bal: {{ Converter.toMoney(balanceStore.userBalances[vault.asset.address]) }}
                        </p>

                        <button @click="deposit">{{ depositing ? 'Depositing' : 'Approve & Deposit' }}</button>
                    </div>

                    <div class="cash" v-else>
                        <div class="input">
                            <input v-model="amount" type="number" placeholder="0.00">
                            <div class="token">{{ vault.asset.symbol }} LP</div>
                        </div>

                        <p class="balance">LP Bal: {{ Converter.toMoney(balanceStore.userBalances[vault.address]) }}</p>

                        <button @click="withdraw">{{ withdrawing ? 'Withdrawing' : 'Approve & Withdraw' }}</button>
                    </div>
                </div>

                <div class="lp_info">
                    <div class="lp_info_head">
                        <h3>LP Breakdown</h3>

                        <div class="tabs">
                            <button @click="tabs.lp = 'lp'"
                                :class="tabs.lp === 'lp' ? 'tab tab_active' : 'tab'">1LP</button>
                            <button @click="tabs.lp = 'total'"
                                :class="tabs.lp === 'total' ? 'tab tab_active' : 'tab'">Total Pool</button>
                        </div>
                    </div>

                    <div class="lp_data">
                        <table>
                            <thead>
                                <tr>
                                    <th>LP</th>
                                    <th>ASSET</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1LP</td>
                                    <td>1{{ vault.asset.symbol }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="agent">
                    <div class="agent_head">
                        <h3>Agent</h3>

                        <RouterLink :to="`/agents/${agent.address}`">
                            <button>View agent</button>
                        </RouterLink>
                    </div>

                    <div class="agent_info">
                        <img :src="agent.image" alt="">
                        <p>{{ agent.name }}</p>
                    </div>
                </div>

                <div class="strategies">
                    <div class="strategies_head">
                        <h3>Strategies</h3>

                        <div class="tabs">
                            <button @click="tabs.strategies = 'in-use'"
                                :class="tabs.strategies === 'in-use' ? 'tab tab_active' : 'tab'">In use</button>
                            <button @click="tabs.strategies = 'all'"
                                :class="tabs.strategies === 'all' ? 'tab tab_active' : 'tab'">All strategies</button>
                        </div>
                    </div>

                    <div class="strategies_info">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Platform</th>
                                    <th>APY</th>
                                    <th>Last harvert</th>
                                    <th>Allocation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Aave Supply Only</td>
                                    <td>Aave</td>
                                    <td>23.82%</td>
                                    <td>2 hours ago</td>
                                    <td>76%</td>
                                </tr>
                                <tr>
                                    <td>Unallocated</td>
                                    <td>AfterYield</td>
                                    <td>0.00%</td>
                                    <td>2 hours ago</td>
                                    <td>24%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="safety">
                    <div class="safety_head">
                        <h3>Safety Score</h3>
                    </div>
                    <div class="safety_data">
                        <h1> {{
                            vault.allSupportedStrategies.reduce((a, b) => a + b.safety, 0) /
                            vault.allSupportedStrategies.length
                        }} of 100</h1>
                    </div>
                </div>

                <div class="vault_details">
                    <div class="vault_details_head">
                        <h3>Details</h3>

                        <div class="tabs">
                            <button @click="tabs.detail = 'asset'"
                                :class="tabs.detail === 'asset' ? 'tab tab_active' : 'tab'">Asset</button>
                            <button @click="tabs.detail = 'rewards'"
                                :class="tabs.detail === 'rewards' ? 'tab tab_active' : 'tab'">Rewards</button>
                            <button @click="tabs.detail = 'platform'"
                                :class="tabs.detail === 'platform' ? 'tab tab_active' : 'tab'">Platforms</button>
                        </div>
                    </div>

                    <div class="vault_details_info">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody v-if="tabs.detail === 'asset'">
                                <tr>
                                    <td>Name</td>
                                    <td>{{ vault.asset.name }}</td>
                                </tr>
                                <tr>
                                    <td>Symbol</td>
                                    <td>{{ vault.asset.symbol }}</td>
                                </tr>
                                <tr>
                                    <td>Decimals</td>
                                    <td>{{ vault.asset.decimals }}</td>
                                </tr>
                                <tr>
                                    <td>Asset-Type</td>
                                    <td>ERC20</td>
                                </tr>
                            </tbody>
                            <tbody v-else-if="tabs.detail === 'platform'">
                                <tr>
                                    <td>Name</td>
                                    <td>{{ vault.allSupportedStrategies[0].platform.name }}</td>
                                </tr>
                                <tr>
                                    <td>Website</td>
                                    <td><a :href="vault.allSupportedStrategies[0].platform.website" target="_blank">{{
                                        vault.allSupportedStrategies[0].platform.website }}</a></td>
                                </tr>
                                <tr>
                                    <td>Logo</td>
                                    <td><img :src="vault.allSupportedStrategies[0].platform.icon" alt=""></td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>

        <ProgressBox v-else />
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
    display: flex;
    justify-content: center;
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

.average {
    font-size: 12px;
    color: var(--tx-dimmed);
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

.cash {
    padding: 24px;
}

.cash .input {
    display: flex;
    align-items: center;
    border-radius: 6px;
    background: var(--bg-light);
    overflow: hidden;
}

.cash input {
    height: 40px;
    background: none;
    border: none;
    outline: none;
    font-size: 24px;
    padding: 0 16px;
    color: var(--tx-normal);
    width: 100%;
}

.cash .token {
    min-width: 100px;
    padding: 0 10px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--bg-lightest);
    font-size: 16px;
    color: var(--tx-dimmed);
}

.balance {
    margin-top: 10px;
    font-size: 14px;
    color: var(--tx-semi);
}

.cash button {
    margin-top: 40px;
    width: 100%;
    height: 50px;
    border-radius: 6px;
    background: var(--primary-light);
    border: none;
    cursor: pointer;
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

.agent_info {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 24px;
}

.agent_info img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
}

.agent_info p {
    color: var(--tx-semi);
    font-weight: 500;
    font-size: 18px;
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

.safety_data {
    padding: 30px 0;
    text-align: center;
    color: var(--tx-normal);
    font-size: 30px;
    font-weight: 400;
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


table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
}

th {
    padding: 0 24px;
}

thead {
    height: 40px;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--tx-dimmed);
}

tbody tr {
    height: 50px;
    font-size: 14px;
    color: var(--tx-semi);
    border-collapse: collapse;
}


tbody td {
    padding: 0 24px;
    border-top: 1px solid var(--bg-lightest);
}

table a {
    color: var(--primary-light);
    text-decoration: underline;
}

table img {
    width: 24px;
    height: 24px;
    border-radius: 20px;
    object-fit: cover;
}
</style>