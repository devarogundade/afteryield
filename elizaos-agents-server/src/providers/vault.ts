import { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";
import { Vault } from "src/contracts/vault";
import { type Hex } from "viem";

export const VaultProvider: Provider = {
  name: "vaultProvider",
  description: `
    Fetches vault info for a specified address.
  `,
  dynamic: false,
  position: 0,
  async get(_runtime: IAgentRuntime, _message: Memory, state: State) {
    const vaultAddress = state.params?.vaultAddress as Hex | undefined;
    if (!vaultAddress) {
      return { values: {}, text: "No vault address provided." };
    }
    const vault = new Vault(vaultAddress);
    const balance = await vault.getBalance();
    const available = await vault.getAvailable();
    const summary = await vault.getSummary();
    const strategiesInUse = await vault.getStrategies();

    return {
      values: { vaultInfo: { balance, available, summary, strategiesInUse } },
      text: `Loaded vault data for ${vaultAddress}`,
    };
  },
};
