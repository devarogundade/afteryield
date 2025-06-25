import type { Hex } from "viem";
import axios from "axios";
import type { AfterYieldAgent, VaultInfo, StrategyInfo } from "@/scripts/types";

const Clients = {
  api: axios.create({ baseURL: import.meta.env.VITE_SERVER_URL }),

  async getAgents(): Promise<AfterYieldAgent[]> {
    return (await this.api.get("/agents")).data;
  },

  async getAgent(address: Hex): Promise<AfterYieldAgent | undefined> {
    return (await this.api.get(`/agents/${address}`)).data;
  },

  async getVaults(): Promise<VaultInfo[]> {
    return (await this.api.get("/vaults")).data;
  },

  async getVault(address: Hex): Promise<VaultInfo | undefined> {
    return (await this.api.get(`/vaults/${address}`)).data;
  },

  async getStrategies(): Promise<StrategyInfo[]> {
    return (await this.api.get("/strategies")).data;
  },

  async getStrategy(address: Hex): Promise<StrategyInfo | undefined> {
    return (await this.api.get(`/strategies/${address}`)).data;
  },
};

export { Clients };
