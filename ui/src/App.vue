<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import { computed, onMounted, watch } from 'vue';
import { useDataStore } from './stores/data';
import { Clients } from './scripts/clients';
import { useWalletStore } from './stores/wallet';
import { AccountContract, AccountFactoryContract } from './scripts/contracts';
import { formatUnits, formatEther } from 'viem';
import { useBalanceStore } from './stores/balance';
import { getTokens } from './scripts/constants';
import { TokenContract } from './scripts/erc20';

const dataStore = useDataStore();
const walletStore = useWalletStore();
const balanceStore = useBalanceStore();

const getVaults = async () => {
  dataStore.setVaults(await Clients.getVaults());
};

const getStrategies = async () => {
  dataStore.setStrategies(await Clients.getStrategies());
};

const getAgents = async () => {
  dataStore.setAgents(await Clients.getAgents());
  getAccountAgents();
};

const getAccountAgents = async () => {
  if (!dataStore.account || dataStore.agents.length == 0) return;

  const agents = await AccountContract.getAgents(dataStore.account);
  if (agents) dataStore.setAccountAgents(agents);
};

const getAccountTokenBalances = async () => {
  if (!dataStore.account) return;

  for (let index = 0; index < getTokens.length; index++) {
    const balance = await TokenContract.getTokenBalance(
      getTokens[index].address,
      dataStore.account
    );

    balanceStore.setBalance(
      getTokens[index].address,
      Number(formatUnits(balance, getTokens[index].decimals))
    );
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

    balanceStore.setUserBalance(dataStore.vaults[index].address, Number(formatEther(balance)));
  }
};

const getAccount = async () => {
  if (walletStore.address) {
    const account = await AccountFactoryContract.getAccount(walletStore.address);
    if (account) dataStore.setAccount(account);
  }
};

watch(computed(() => walletStore.address), () => {
  getAccount();
  getUserTokenBalances();
  getUserVaultTokenBalances();
});

watch(computed(() => dataStore.vaults), () => {
  getUserVaultTokenBalances();
});

watch(computed(() => dataStore.account), () => {
  getAccountTokenBalances();
  getAccountAgents();
});

onMounted(() => {
  getVaults();
  getStrategies();
  getAgents();
});
</script>

<template>
  <AppHeader />
  <RouterView />
</template>