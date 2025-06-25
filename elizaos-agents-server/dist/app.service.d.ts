import type { AfterYieldAgent, StrategyInfo, VaultInfo } from "./types";
import type { Hex } from "viem";
import { Queue } from "bullmq";
export declare class AppService {
    private vaultWorkerQueue;
    constructor(vaultWorkerQueue: Queue);
    getAgents(): AfterYieldAgent[];
    getAgent(agentAddress: Hex): AfterYieldAgent | undefined;
    getVaults(): VaultInfo[];
    getVault(vaultAddress: Hex): VaultInfo | undefined;
    getStrategies(): StrategyInfo[];
    getStrategy(strategyAddress: Hex): StrategyInfo | undefined;
}
