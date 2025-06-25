import { Service } from "@elizaos/core";
import { type Hex } from "viem";
export declare class VaultService extends Service {
    static serviceType: string;
    capabilityDescription: string;
    deposit(vaultAddress: Hex, amountScaled: bigint, account: Hex): Promise<string | null>;
    withdraw(vaultAddress: Hex, lpAmount: bigint, account: Hex): Promise<string | null>;
    addStrategy(vaultAddress: Hex, newStrategy: Hex): Promise<string | null>;
    removeStrategy(vaultAddress: Hex, strategyToRemove: Hex): Promise<string | null>;
    reallocate(vaultAddress: Hex, allocations: number[]): Promise<string | null>;
    stop(): Promise<void>;
}
