import type { AfterYieldAgent, StrategyInfo, VaultInfo } from "./types";
import type { Hex } from "viem";
export declare class AppService {
    getAgents(): AfterYieldAgent[];
    getAgent(agentAddress: Hex): AfterYieldAgent | undefined;
    getVaults(): VaultInfo[];
    getVault(vaultAddress: Hex): VaultInfo | undefined;
    getStrategies(): StrategyInfo[];
    getStrategy(strategyAddress: Hex): StrategyInfo | undefined;
}
