import { Service } from "@elizaos/core";
import { Vault } from "../contracts/vault";
import { type Hex } from "viem";

export class VaultService extends Service {
  static serviceType = "VaultService";

  capabilityDescription = `
    Vault deposit and query service. 
    Handles withdrawals from a vault.
    Handles vault strategy entry operations.
    Handles vault strategy removal operations.
    Handles vault strategy reallocations.
    `;

  async deposit(
    vaultAddress: Hex,
    amountScaled: bigint,
    account: Hex
  ): Promise<string | null> {
    const vault = new Vault(vaultAddress);
    const txHash = await vault.depositFromAccount(amountScaled, account);
    return txHash || null;
  }

  async withdraw(
    vaultAddress: Hex,
    lpAmount: bigint,
    account: Hex
  ): Promise<string | null> {
    const vault = new Vault(vaultAddress);
    return (await vault.withdrawToAccount(lpAmount, account)) || null;
  }

  async addStrategy(
    vaultAddress: Hex,
    newStrategy: Hex
  ): Promise<string | null> {
    const vault = new Vault(vaultAddress);
    return (await vault.addStrategy(newStrategy)) || null;
  }

  async removeStrategy(
    vaultAddress: Hex,
    strategyToRemove: Hex
  ): Promise<string | null> {
    const vault = new Vault(vaultAddress);
    return (await vault.removeStrategy(strategyToRemove)) || null;
  }

  async reallocate(
    vaultAddress: Hex,
    allocations: number[]
  ): Promise<string | null> {
    const vault = new Vault(vaultAddress);
    return (await vault.reallocate(allocations)) || null;
  }

  async stop(): Promise<void> {}
}
