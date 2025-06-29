import { publicClient } from "../connections/web3";
import { vaultABI } from "../abis/vault";
import { encodeAbiParameters, type Hex } from "viem";
import { VaultInfo } from "../types";
import { VAULTS } from "../constants/vault";

class Vault {
  private readonly vaultInfo: VaultInfo;

  constructor(vaultAddress: Hex) {
    const vaultInfo = VAULTS.find((vault) => vault.address === vaultAddress);
    if (!vaultInfo) throw new Error("Vault not found!");
    this.vaultInfo = vaultInfo;
  }

  depositFromAccount(amountScaled: bigint, account: Hex): Hex {
    return encodeAbiParameters(
      [
        { type: "address", name: "vault" },
        { type: "uint256", name: "amountScaled" },
        { type: "address", name: "account" },
      ],
      [this.vaultInfo.address, amountScaled, account]
    );
  }

  withdrawFromAccount(lpAmount: bigint, account: Hex): Hex {
    return encodeAbiParameters(
      [
        { type: "address", name: "vault" },
        { type: "uint256", name: "lpAmount" },
        { type: "address", name: "account" },
      ],
      [this.vaultInfo.address, lpAmount, account]
    );
  }

  addStrategy(newStrategy: Hex): Hex {
    return encodeAbiParameters(
      [
        { type: "address", name: "vault" },
        { type: "address", name: "newStrategy" },
      ],
      [this.vaultInfo.address, newStrategy]
    );
  }

  removeStrategy(strategyToRemove: Hex): Hex {
    return encodeAbiParameters(
      [
        { type: "address", name: "vault" },
        { type: "address", name: "strategyToRemove" },
      ],
      [this.vaultInfo.address, strategyToRemove]
    );
  }

  reallocate(allocations: bigint[]): Hex {
    return encodeAbiParameters(
      [
        { type: "address", name: "vault" },
        { type: "uint256[]", name: "allocations" },
      ],
      [this.vaultInfo.address, allocations]
    );
  }

  async getShares(lpAmount: bigint): Promise<bigint> {
    try {
      const result = await publicClient.readContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "getShares",
        args: [lpAmount],
      });

      return result as bigint;
    } catch (error: any) {
      console.log(error);
      return BigInt(0);
    }
  }

  async getBalance(): Promise<bigint> {
    try {
      const result = await publicClient.readContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "getBalance",
      });

      return result as bigint;
    } catch (error: any) {
      console.log(error);
      return BigInt(0);
    }
  }

  async getAvailable(): Promise<bigint> {
    try {
      const result = await publicClient.readContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "getAvailable",
      });

      return result as bigint;
    } catch (error: any) {
      console.log(error);
      return BigInt(0);
    }
  }

  async getAllocation(strategy: Hex): Promise<bigint> {
    try {
      const result = await publicClient.readContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "getAllocation",
        args: [strategy],
      });

      return result as bigint;
    } catch (error: any) {
      console.log(error);
      return BigInt(0);
    }
  }

  async getSummary(): Promise<{ allocated: bigint; idle: bigint }> {
    try {
      const result = await publicClient.readContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "getSummary",
      });

      return result as { allocated: bigint; idle: bigint };
    } catch (error: any) {
      console.log(error);
      return {
        allocated: BigInt(0),
        idle: BigInt(0),
      };
    }
  }

  async getStrategies(): Promise<Hex[]> {
    try {
      const result = await publicClient.readContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "getStrategies",
      });

      return result as Hex[];
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }
}

export { Vault };
