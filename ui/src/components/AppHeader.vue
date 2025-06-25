<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { config, chains } from '@/scripts/config';
import { useWalletStore } from '@/stores/wallet';
import { createWeb3Modal } from '@web3modal/wagmi/vue';
import { useWeb3Modal } from '@web3modal/wagmi/vue';
import { watchAccount } from '@wagmi/core';
import Converter from '@/scripts/converter';

const Tabs = ref([{
    routeName: 'home',
    path: '/',
    name: 'Vaults'
}, {
    routeName: 'agents',
    path: '/agents',
    name: 'Agents'
}, {
    routeName: 'governance',
    path: '/governance',
    name: 'Governance'
}, {
    routeName: 'account',
    path: '/account',
    name: 'Account'
}]);


const route = useRoute();

createWeb3Modal({
    wagmiConfig: config,
    projectId: import.meta.env.VITE_PROJECT_ID,
    // @ts-ignore
    chains: chains,
    enableAnalytics: true,
    themeMode: 'dark'
});

const modal = useWeb3Modal();
const walletStore = useWalletStore();

onMounted(() => {
    watchAccount(config, {
        onChange(account) {
            if (account.address) {
                walletStore.setAddress(account.address);
            }
        },
    });
});
</script>

<template>
    <section>
        <div class="app_width">
            <header>
                <div class="menu">
                    <div class="logo">After<span>Yield</span></div>

                    <div class="tabs">
                        <div v-for="tab in Tabs"
                            :class="route.name?.toString().startsWith(tab.routeName) ? 'tab_active tab' : 'tab'">
                            <RouterLink :to="tab.path">
                                <button>{{ tab.name }}</button>
                            </RouterLink>
                            <div class="tab_border"></div>
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <button class="connect" @click="modal.open()">{{
                        walletStore.address ? Converter.fineAddress(walletStore.address, 5) : 'Connect Wallet'
                        }}</button>
                </div>
            </header>
        </div>
    </section>
</template>


<style scoped>
section {
    border-bottom: 1px solid var(--bg-lightest);
    background: var(--bg);
    position: sticky;
    top: 0;
    z-index: 99;
}

.logo {
    font-size: 20px;
    color: var(--tx-normal);
}

.logo span {
    color: var(--tx-semi);
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    height: 54px;
}

.menu {
    display: flex;
    align-items: center;
    gap: 40px;
    height: 100%;
}

.tabs {
    display: flex;
    gap: 4px;
    align-items: center;
    height: 100%;
}

.tab {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.tab button {
    height: 32px;
    padding: 0 16px;
    background: none;
    border: none;
    font-size: 14px;
    color: var(--tx-dimmed);
    cursor: pointer;
    border-radius: 4px;
}

.tab button:hover {
    background: var(--bg-lightest);
}

.tab_border {
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: 0;
}

.tab_active button {
    color: var(--tx-normal);
}

.tab_active .tab_border {
    background: var(--primary-light);
}


.actions {
    display: flex;
    align-items: center;
}

.connect {
    width: 140px;
    font-weight: 500;
    height: 36px;
    border: none;
    border-radius: 6px;
    background: var(--primary);
    color: var(--tx-normal);
    cursor: pointer;
}
</style>