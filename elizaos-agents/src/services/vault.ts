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

  deposit(vaultAddress: Hex, amountScaled: bigint, account: Hex): Hex {
    return new Vault(vaultAddress).depositFromAccount(amountScaled, account);
  }

  withdraw(vaultAddress: Hex, lpAmount: bigint, account: Hex): Hex {
    return new Vault(vaultAddress).withdrawFromAccount(lpAmount, account);
  }

  addStrategy(vaultAddress: Hex, newStrategy: Hex): Hex {
    return new Vault(vaultAddress).addStrategy(newStrategy);
  }

  removeStrategy(vaultAddress: Hex, strategyToRemove: Hex): Hex {
    return new Vault(vaultAddress).removeStrategy(strategyToRemove);
  }

  reallocate(vaultAddress: Hex, allocations: bigint[]): Hex {
    return new Vault(vaultAddress).reallocate(allocations);
  }

  async stop(): Promise<void> {}
}
