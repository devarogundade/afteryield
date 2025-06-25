import { zeroAddress, type Hex } from "viem";
import { defineStore } from "pinia";
import type { AfterYieldAgent, StrategyInfo, VaultInfo } from "@/scripts/types";

export const useDataStore = defineStore("data", {
  state: () => ({
    vaults: [] as VaultInfo[],
    agents: [] as AfterYieldAgent[],
    strategies: [] as StrategyInfo[],
    account: zeroAddress as Hex,
  }),
  actions: {
    setVaults(newVaults: VaultInfo[]) {
      this.vaults = newVaults;
    },
    setAgents(newAgents: AfterYieldAgent[]) {
      this.agents = newAgents;
    },
    setStrategies(newStrategies: StrategyInfo[]) {
      this.strategies = newStrategies;
    },
    setAccount(newAccount: Hex) {
      this.account = newAccount;
    },
  },
});
