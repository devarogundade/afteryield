<script setup lang="ts">
import Converter from '@/scripts/converter';
import type { AfterYieldAgent, AssetType } from '@/scripts/types';
import { useBalanceStore } from '@/stores/balance';
import { useDataStore } from '@/stores/data';
import type { Hex } from 'viem';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const dataStore = useDataStore();
const balanceStore = useBalanceStore();

const filter = ref({
  assetType: null as AssetType | null,
  agents: [] as Hex[]
});

const addOrRemoveAgentToFilter = (agent: AfterYieldAgent) => {
  const index = filter.value.agents.findIndex(a => a === agent.address);
  if (index > -1) {
    filter.value.agents.splice(index, 1);
  } else {
    filter.value.agents.push(agent.address);
  }
};
</script>

<template>
  <section>
    <div class="app_width">
      <div class="stats">
        <div class="portfolio">
          <div class="portfolio_title">
            <h3>Portfolio</h3>
            <i v-tooltip:top="`Hide balances`" class="fi fi-rs-crossed-eye"></i>
          </div>

          <div class="portfolio_stats">
            <div class="stat">
              <h3>DEPOSITED</h3>
              <p>$0</p>
            </div>

            <div class="stat">
              <h3>MONTHLY YIELD</h3>
              <p>$0</p>
            </div>

            <div class="stat">
              <h3>DAILY YIELD</h3>
              <p>$0</p>
            </div>

            <div class="stat">
              <h3>AVG. APY</h3>
              <p>0%</p>
            </div>
          </div>
        </div>

        <div class="platform">
          <div class="platform_title">
            <h3>Platform</h3>
          </div>

          <div class="platform_stats">
            <div class="stat">
              <h3>
                TVL
                <i v-tooltip:top="`Total Value Locked`" class="fi fi-rs-info"></i>
              </h3>

              <p>$270.80M</p>
            </div>

            <div class="stat">
              <h3>Vaults</h3>
              <p>{{ dataStore.vaults.length }}</p>
            </div>

            <div class="stat">
              <h3>Agents</h3>
              <p>{{ dataStore.agents.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="vaults">
        <div class="vaults_toolbar">
          <div class="tab_left">
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
            <div class="agents">
              <div v-for="agent in dataStore.agents"
                :class="filter.agents.includes(agent.address) ? 'agent_active agent' : 'agent'">
                <img :src="agent.image" alt="" @click="addOrRemoveAgentToFilter(agent)">
              </div>
            </div>

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
              <th>Agent</th>
              <th>Safety</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="vault in dataStore.vaults.filter(vault => filter.agents.length === 0 ? true : filter.agents.includes(vault.agentAddress))"
              :key="vault.address" @click="router.push(`/vaults/${vault.address}`)">
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
                  (vault.allSupportedStrategies.reduce((a, b) => a + b.apy, 0) / vault.allSupportedStrategies.length
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
                <div class="vault_agent"
                  v-tooltip:top="dataStore.agents.find(agent => agent.address === vault.agentAddress)?.name">
                  <img :src="dataStore.agents.find(agent => agent.address === vault.agentAddress)?.image" alt="">
                </div>
              </td>
              <td>
                <div class="safety">
                  <p>
                    {{
                      vault.allSupportedStrategies.reduce((a, b) => a + b.safety, 0) / vault.allSupportedStrategies.length
                    }} of 100
                  </p>
                  <i v-tooltip:top="`Very safe.`" class="fi fi-rs-info"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>


<style scoped>
.stats {
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
}

.portfolio_stats,
.platform_stats {
  margin-top: 10px;
  display: flex;
  gap: 24px;
}

.portfolio_title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.portfolio_title h3,
.platform_title h3 {
  font-weight: 400;
  font-size: 26px;
  color: var(--tx-semi);
}

.portfolio_title i {
  color: var(--tx-dimmed);
  font-size: 26px;
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

.vaults {
  background: var(--bg-lighter);
  border-radius: 20px 20px 0 0;
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

.agents {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.agent img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
  border: 2px solid var(--bg-lightest);
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
}
</style>