import { AppService } from "./app.service";
import type { StrategyInfo, VaultInfo, AfterYieldAgent } from "./types";
import type { Hex } from "viem";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getAgents(): AfterYieldAgent[];
    getAgent(agentAddress: Hex): AfterYieldAgent | undefined;
    getVaults(): VaultInfo[];
    getVault(vaultAddress: Hex): VaultInfo | undefined;
    getStrategies(): StrategyInfo[];
    getStrategy(strategyAddress: Hex): StrategyInfo | undefined;
}
