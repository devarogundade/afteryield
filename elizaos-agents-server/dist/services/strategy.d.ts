import { Service } from "@elizaos/core";
import type { Hex } from "viem";
export declare class StrategyService extends Service {
    static serviceType: string;
    capabilityDescription: string;
    profile(strategyAddress: Hex): Promise<{
        vault?: Hex;
        asset: Hex;
        balance: bigint;
        balanceAsset: bigint;
        balancePool: bigint;
        allocation: bigint;
    }>;
    stop(): Promise<void>;
}
