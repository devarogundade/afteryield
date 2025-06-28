import { publicClient, walletClient } from "../connections/web3";
import { vaultABI } from "../abis/vault";
import type { Hex } from "viem";
import { VaultInfo } from "../types";
import { VAULTS } from "../constants/vault";

class Vault {
  private readonly vaultInfo: VaultInfo;

  constructor(vaultAddress: Hex) {
    const vaultInfo = VAULTS.find((vault) => vault.address === vaultAddress);
    if (!vaultInfo) throw new Error("Vault not found!");
    this.vaultInfo = vaultInfo;
  }

  async depositFromAccount(
    amountScaled: bigint,
    account: Hex
  ): Promise<Hex | null> {
    try {
      return await walletClient.writeContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "depositFromAccount",
        args: [amountScaled, account],
      });
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async withdrawToAccount(lpAmount: bigint, account: Hex): Promise<Hex | null> {
    try {
      return await walletClient.writeContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "withdrawToAccount",
        args: [lpAmount, account],
      });
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async withdrawAllToAccount(account: Hex): Promise<Hex | null> {
    try {
      return await walletClient.writeContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "withdrawAllToAccount",
        args: [account],
      });
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async addStrategy(newStrategy: Hex): Promise<Hex | null> {
    try {
      return await walletClient.writeContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "addStrategy",
        args: [newStrategy],
      });
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async removeStrategy(strategyToRemove: Hex): Promise<Hex | null> {
    try {
      return await walletClient.writeContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "removeStrategy",
        args: [strategyToRemove],
      });
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async reallocate(allocations: Array<number>): Promise<Hex | null> {
    try {
      return await walletClient.writeContract({
        address: this.vaultInfo.address,
        abi: vaultABI,
        functionName: "reallocate",
        args: [allocations],
      });
    } catch (error: any) {
      console.log(error);
      return null;
    }
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
