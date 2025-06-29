<script setup lang="ts">
import AccountSetup from '@/components/AccountSetup.vue';
import AllAssets from '@/components/AllAssets.vue';
import { getTokens } from '@/scripts/constants';
import ReceiveToken from '@/components/ReceiveToken.vue';
import { useBalanceStore } from '@/stores/balance';
import { useDataStore } from '@/stores/data';
import { useWalletStore } from '@/stores/wallet';
import { zeroAddress } from 'viem';
import { ref } from 'vue';
import type { AfterYieldAgent } from '@/scripts/types';
import { useRouter } from 'vue-router';
import { AccountContract } from '@/scripts/contracts';
import { notify } from '@/reactives/notify';
import Converter from '@/scripts/converter';

const router = useRouter();
const dataStore = useDataStore();
const walletStore = useWalletStore();
const balanceStore = useBalanceStore();

const receiveToken = ref(false);
const allAssets = ref(false);
const progress = ref(false);

const removingAgent = ref(false);

const getAccountAgents = async () => {
    if (!dataStore.account || dataStore.agents.length == 0) return;

    const agents = await AccountContract.getAgents(dataStore.account);
    if (agents) dataStore.setAccountAgents(agents);
};

const removeFromAccount = async (agent: AfterYieldAgent, e: any) => {
    e.preventDefault();

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
</script>

<template>
    <AccountSetup v-if="dataStore.account === zeroAddress" />

    <div class="treasury" v-else>
        <div class="assets_grid">
            <div class="assets">
                <div class="assets_head">
                    <p>Total Value Locked</p>

                    <div class="dropdown">
                        <div class="dropdown_item" @click="allAssets = true">
                            <p>All assets</p>
                            <i class="fi fi-rs-angle-small-right"></i>
                        </div>
                    </div>
                </div>

                <div class="assets_value">
                    <div class="value_amount">
                        <p>${{Converter.toMoney(getTokens.reduce((a, token) => a +
                            (balanceStore.balances[token.address] * token.price), 0))}}
                            <!-- <span>+0.00%</span> -->
                        </p>

                        <div class="stats">
                            <div class="stat">
                                <i class="fi fi-rs-send"></i>
                                <p>$0.00 <span>Outs</span></p>
                            </div>

                            <div class="stat">
                                <i class="fi fi-rs-receive"></i>
                                <p>${{Converter.toMoney(getTokens.reduce((a, token) => a +
                                    (balanceStore.balances[token.address] * token.price), 0))}} <span>Ins</span></p>
                            </div>
                        </div>
                    </div>

                    <div class="value_tokens">
                        <div class="images">
                            <img v-for="token in getTokens" :src="token.icon" alt="">
                            <img src="/images/token.png" alt="">
                        </div>

                        <p>{{ getTokens.length }} <span>Assets</span></p>
                    </div>
                </div>

                <div class="assets_actions">
                    <button>
                        <SendIcon />
                        <p>Send</p>
                    </button>

                    <button @click="receiveToken = true">
                        <ReceiveIcon />
                        <p>Receive</p>
                    </button>

                    <button>
                        <SwapIcon />
                        <p>Swap</p>
                    </button>
                </div>
            </div>

            <div class="top_assets">
                <div class="assets_head">
                    <p>My agents</p>

                    <div class="dropdown">
                        <RouterLink to="/agents">
                            <div class="dropdown_item">
                                <p>All agents</p>
                                <i class="fi fi-rs-angle-small-right"></i>
                            </div>
                        </RouterLink>
                    </div>
                </div>

                <RouterLink v-for="agent, index in dataStore.accountAgents" :to="`/agents/${agent.address}`"
                    :key="index">
                    <div class="top_asset">
                        <div class="info">
                            <img :src="agent.image" alt="">
                            <p>{{ agent.name }}</p>
                        </div>

                        <div class="balance">
                            <p>Capabilities: <span>{{ 'Deposit, Withdraw' }}</span></p>
                        </div>

                        <div class="price">
                            <button class="use">Edit capabilities</button>
                            <button class="use" @click="removeFromAccount(agent, $event)">
                                {{ removingAgent ? 'Removing' : 'Remove from account' }}
                            </button>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>

        <ProgressBox v-if="progress" />

        <div class="activities" v-else>
            <div class="title">
                <div class="name">
                    <p>Activities</p>
                    <p>{{ 12 }} <span>Total</span></p>
                </div>

                <button class="filter">
                    <FilterIcon />
                    <p>Filter</p>
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <td>Type</td>
                        <td>Time</td>
                        <td>Status</td>
                        <td>Initiator</td>
                        <td>Amount</td>
                        <td></td>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="activity, index in [1, 2, 3]" :key="index">
                        <td>
                            <div class="product">
                                <div class="product_info">
                                    <p>Deposit</p>

                                    <div>
                                        <p>Atlas</p>
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div class="time">
                                <p>
                                    {{
                                        Intl.DateTimeFormat('en-US', {
                                            day: '2-digit',
                                            month: 'short',
                                        }).format(Date.now())
                                    }}
                                </p>
                                <p>
                                    {{
                                        Intl.DateTimeFormat('en-US', {
                                            second: '2-digit',
                                            minute: '2-digit',
                                            hour: '2-digit'
                                        }).format(Date.now())
                                    }}
                                </p>
                            </div>
                        </td>

                        <td>
                            <div class="status">
                                <CompletedIcon />
                                <p>Completed</p>
                            </div>
                        </td>

                        <td>
                            <div class="initiator">
                                <p>Atlas</p>
                            </div>
                        </td>

                        <td>
                            <div class="amount">
                                <p>{{ 0 }} <span>{{ 'LINK' }}</span></p>
                            </div>
                        </td>

                        <td>
                            <div class="view_dropdown">
                                <div class="view">
                                    <ChevronDownIcon />
                                </div>
                            </div>
                        </td>


                    </tr>
                </tbody>
            </table>

            <div class="empty" v-if="!progress && [].length == 0">
                <img src="/images/empty.png" alt="">
                <p>No activities.</p>
            </div>
        </div>

        <ReceiveToken v-if="dataStore.account && receiveToken" :address="dataStore.account"
            @close="receiveToken = false" />

        <AllAssets v-if="allAssets" @close="allAssets = false" />
    </div>
</template>

<style scoped>
.treasury {
    padding: 30px 50px;
    padding-bottom: 100px;
}

.assets_grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}


.assets {
    padding-right: 20px;
    border-right: 1px solid var(--bg-lightest);
}

.top_assets {
    padding-left: 20px;
}

.top_asset {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    border-bottom: 1px solid var(--bg-lightest);
}

.top_asset .info {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 120px;
}

.top_asset .info img {
    width: 30px;
    height: 30px;
    border-radius: 10px;
}

.top_asset .info p {
    color: var(--tx-normal);
    font-size: 16px;
}

.top_asset .balance {
    width: 300px;
}

.top_asset .balance p {
    color: var(--tx-normal);
    font-size: 14px;
}

.top_asset .balance p span {
    color: var(--tx-semi);
    font-size: 14px;
}



.top_asset .price {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
}

.top_asset .use {
    min-width: 150px;
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

.top_asset .price p {
    color: var(--tx-normal);
    font-size: 16px;
}

.top_asset .price span {
    color: var(--tx-semi);
    font-size: 16px;
}

.top_asset .price div {
    display: flex;
    align-items: center;
    gap: 10px;
}

.assets_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg-lightest);
    padding-bottom: 20px;
}

.assets_head>p {
    color: var(--tx-semi);
    font-size: 16px;
}

.assets_head .dropdown {
    border-radius: 6px;
    border: 1px solid var(--bg-lightest);
}

.dropdown_item {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 32px;
    padding: 0 12px;
    cursor: pointer;
}

.assets_head p {
    color: var(--tx-semi);
    font-size: 14px;
}

.assets_value {
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg-lightest);
}

.value_amount>p {
    color: var(--tx-normal);
    font-size: 26px;
}

.value_amount>p span {
    color: var(--accent-green);
    font-size: 14px;
}

.stats {
    gap: 12px;
    margin-top: 10px;
    display: flex;
    align-items: center;
}

.stat {
    display: flex;
    gap: 4px;
}

.stat p {
    color: var(--tx-semi);
    font-size: 14px;
}

.stat p span {
    color: var(--tx-dimmed);
}

.value_tokens {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.images img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-left: -10px;
}

.value_tokens p {
    margin-top: 10px;
    color: var(--tx-semi);
    font-size: 14px;
}

.value_tokens p span {
    color: var(--tx-dimmed);
}

.assets_actions {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.assets_actions button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 8px;
    background: none;
    gap: 10px;
    width: 100%;
    border: 1px solid var(--bg-lightest);
    height: 40px;
    cursor: pointer;
}

.assets_actions button p {
    font-size: 14px;
    color: var(--tx-normal);
}

.activities {
    margin-top: 30px;
}

.activities .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.activities .title p:first-child {
    color: var(--tx-normal);
    font-size: 16px;
}

.activities .title p:last-child {
    margin-top: 2px;
    color: var(--tx-semi);
    font-size: 14px;
}

.activities .title p:last-child span {
    color: var(--tx-dimmed);
}

.filter {
    height: 40px;
    padding: 0 26px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    border: 1px solid var(--bg-lightest);
    background: none;
}

.filter svg {
    width: 20;
    height: 20;
}

.filter p {
    font-size: 16px;
    color: var(--tx-normal);
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background: var(--bg-light);
    border-radius: 8px;
}

thead tr {
    height: 38px;
}

thead td {
    color: var(--tx-semi);
    font-size: 14px;
}

td:first-child {
    padding-left: 20px;
}

td:last-child {
    padding-right: 20px;
}

thead td:nth-child(5) {
    text-align: right;
}

tbody tr {
    height: 94px;
    padding: 0 20px;
    border-bottom: 1px solid var(--bg-lighter);
}

tbody td {
    cursor: pointer;
}

tbody tr:last-child {
    border: none;
}

tbody td:last-child {
    display: flex;
    height: 94px;
    align-items: center;
    justify-content: center;
}


.product {
    display: flex;
    align-items: center;
    gap: 16px;
}

.product>svg {
    width: 42px;
    height: 42px;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid var(--bg-lightest);
    object-fit: contain;
}

.product_info>p {
    color: var(--tx-normal);
    font-size: 16px;
}

.product_info div {
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.product_info div p {
    color: var(--tx-semi);
    font-size: 14px;
}

.product_info div svg {
    width: 12px;
    height: 12px;
}

.time p:first-child {
    color: var(--tx-normal);
    font-size: 16px;
}

.time p:last-child {
    color: var(--tx-semi);
    font-size: 14px;
}

.status {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--bg-lighter);
    padding: 0 12px;
    height: 30px;
    width: fit-content;
    border-radius: 8px;
}

.status p {
    color: var(--tx-normal);
    font-size: 14px;
}


.signers .users {
    display: flex;
    align-items: center;
    gap: 8px;
}

.signers .users p {
    font-size: 16px;
    color: var(--tx-normal);
}

.signers .users p span {
    color: var(--tx-semi);
}

.signers .progress {
    margin-top: 10px;
    width: 70px;
    height: 5px;
    border-radius: 10px;
    background: var(--bg-lighter);
}

.signers .bar {
    height: 100%;
    background: var(--primary-light);
    border-radius: 10px;
}

.initiator p {
    color: var(--tx-normal);
    font-size: 16px;
}

.amount {
    text-align: right;
}

.amount p:first-child {
    color: var(--tx-normal);
    font-size: 16px;
}

.amount p:first-child span {
    color: var(--tx-semi);
}

.amount p:last-child {
    color: var(--tx-semi);
    font-size: 14px;
}

.view_dropdown {
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
}

.view {
    width: 32px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid var(--bg-lighter);
}

tr {
    position: relative;
    overflow: hidden;
}

.active_activity {
    background: var(--bg-lighter);
    margin-bottom: 132px;
}

.confirmation {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -132px;
    height: 132px;
    display: none;
    padding: 20px;
    z-index: 1;
    background: var(--bg-light);
}

.active_activity .confirmation {
    display: block;
}

.confirmation_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
}

.confirmation_title p {
    color: var(--tx-semi);
    font-size: 14px;
}

.confirmation_signers {
    margin-top: 20px;
    width: 100%;
    display: grid;
    justify-content: space-between;
    border-left: 1px solid var(--bg-lightest);
    border-right: 1px solid var(--bg-lightest);
}

.confirmation_signer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    border-right: 1px solid var(--bg-lightest);
}

.confirmation_signer:last-child {
    border-right: none;
}

.signer_wrapper p {
    margin-top: 6px;
    color: var(--tx-normal);
    font-size: 14px;
}

.signer_info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.signer_info p {
    color: var(--tx-semi);
    font-size: 14px;
}
</style>
