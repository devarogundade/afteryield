import type { Hex } from "viem";
declare class Strategy {
    private readonly strategyInfo;
    constructor(strategyAddress: Hex);
    harvest(): Promise<Hex | null>;
    getVault(): Promise<Hex | null>;
    getAsset(): Promise<Hex | null>;
    getBalanceOf(): Promise<bigint>;
    getBalanceOfAsset(): Promise<bigint>;
    getBalanceOfPool(): Promise<bigint>;
}
export { Strategy };
