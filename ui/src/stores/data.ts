import { zeroAddress, type Hex } from "viem";
import { defineStore } from "pinia";
import type {
  AfterYieldAgent,
  AutoPilotMode,
  StrategyInfo,
  VaultInfo,
} from "@/scripts/types";

export const useDataStore = defineStore("data", {
  state: () => ({
    vaults: [] as VaultInfo[],
    agents: [] as AfterYieldAgent[],
    strategies: [] as StrategyInfo[],
    account: zeroAddress as Hex,
    accountAgents: [] as AfterYieldAgent[],
    modes: {} as { [key: string]: AutoPilotMode },
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
    setAccountAgents(newAgents: Hex[]) {
      this.accountAgents = this.agents.filter((agent) =>
        newAgents.includes(agent.address)
      );
    },
    setMode(vaultAddress: Hex, newMode: AutoPilotMode) {
      this.modes[vaultAddress] = newMode;
    },
  },
});
