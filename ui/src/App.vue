<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import { onMounted } from 'vue';
import { useDataStore } from './stores/data';
import { Clients } from './scripts/clients';

const dataStore = useDataStore();

const getVaults = async () => {
  dataStore.setVaults(await Clients.getVaults());
};

const getStrategies = async () => {
  dataStore.setStrategies(await Clients.getStrategies());

};

const getAgents = async () => {
  dataStore.setAgents(await Clients.getAgents());

};

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
