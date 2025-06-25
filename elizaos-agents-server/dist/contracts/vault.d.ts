import type { Hex } from "viem";
declare class Vault {
    private readonly vaultInfo;
    constructor(vaultAddress: Hex);
    depositFromAccount(amountScaled: bigint, account: Hex): Promise<Hex | null>;
    withdrawToAccount(lpAmount: bigint, account: Hex): Promise<Hex | null>;
    withdrawAllToAccount(account: Hex): Promise<Hex | null>;
    addStrategy(newStrategy: Hex): Promise<Hex | null>;
    removeStrategy(strategyToRemove: Hex): Promise<Hex | null>;
    reallocate(allocations: Array<number>): Promise<Hex | null>;
    getShares(lpAmount: bigint): Promise<bigint>;
    getBalance(): Promise<bigint>;
    getAvailable(): Promise<bigint>;
    getAllocation(strategy: Hex): Promise<bigint>;
    getSummary(): Promise<{
        allocated: bigint;
        idle: bigint;
    }>;
    getStrategies(): Promise<Hex[]>;
}
export { Vault };
