import { Service } from "@elizaos/core";
import { Strategy } from "src/contracts/strategy";
import { Vault } from "src/contracts/vault";
import type { Hex } from "viem";

export class StrategyService extends Service {
  static serviceType = "StrategyService";

  capabilityDescription = "Provides strategy & vault profiling";

  async profile(strategyAddress: Hex): Promise<{
    vault?: Hex;
    asset: Hex;
    balance: bigint;
    balanceAsset: bigint;
    balancePool: bigint;
    allocation: bigint;
  }> {
    const strategy = new Strategy(strategyAddress);
    const vault = await strategy.getVault();
    const asset = await strategy.getAsset();
    const balance = await strategy.getBalanceOf();
    const balanceAsset = await strategy.getBalanceOfAsset();
    const balancePool = await strategy.getBalanceOfPool();

    if (!vault || !asset) throw new Error("");

    const v = new Vault(vault);
    const allocation = await v.getAllocation(strategyAddress);

    return { vault, asset, balance, balanceAsset, balancePool, allocation };
  }

  async stop(): Promise<void> {}
}
