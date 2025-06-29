import { publicClient, walletClient } from "../connections/web3";
import { strategyABI } from "../abis/strategy";
import { StrategyInfo } from "../types";
import type { Hex } from "viem";
import { STRATEGIES } from "../constants/strategy";

class Strategy {
  private readonly strategyInfo: StrategyInfo;

  constructor(strategyAddress: Hex) {
    const strategyInfo = STRATEGIES.find(
      (strategy) => strategy.address === strategyAddress
    );
    if (!strategyInfo) throw new Error("Strategy not found!");
    this.strategyInfo = strategyInfo;
  }

  async getVault(): Promise<Hex | null> {
    try {
      const result = await publicClient.readContract({
        address: this.strategyInfo.address,
        abi: strategyABI,
        functionName: "getVault",
      });

      return result as Hex;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async getAsset(): Promise<Hex | null> {
    try {
      const result = await publicClient.readContract({
        address: this.strategyInfo.address,
        abi: strategyABI,
        functionName: "getAsset",
      });

      return result as Hex;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async getBalanceOf(): Promise<bigint> {
    try {
      const result = await publicClient.readContract({
        address: this.strategyInfo.address,
        abi: strategyABI,
        functionName: "getBalanceOf",
      });

      return result as bigint;
    } catch (error: any) {
      console.log(error);
      return BigInt(0);
    }
  }

  async getBalanceOfAsset(): Promise<bigint> {
    try {
      const result = await publicClient.readContract({
        address: this.strategyInfo.address,
        abi: strategyABI,
        functionName: "getBalanceOfAsset",
      });

      return result as bigint;
    } catch (error: any) {
      console.log(error);
      return BigInt(0);
    }
  }

  async getBalanceOfPool(): Promise<bigint> {
    try {
      const result = await publicClient.readContract({
        address: this.strategyInfo.address,
        abi: strategyABI,
        functionName: "getBalanceOfPool",
      });

      return result as bigint;
    } catch (error: any) {
      console.log(error);
      return BigInt(0);
    }
  }
}

export { Strategy };
