import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import type { StrategyInfo, VaultInfo, AfterYieldAgent } from "./types";
import type { Hex } from "viem";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/agents")
  getAgents(): AfterYieldAgent[] {
    return this.appService.getAgents();
  }

  @Get("/agents/:address")
  getAgent(@Param("address") agentAddress: Hex): AfterYieldAgent | undefined {
    return this.appService.getAgent(agentAddress);
  }

  @Get("/vaults")
  getVaults(): VaultInfo[] {
    return this.appService.getVaults();
  }

  @Get("/vaults/:address")
  getVault(@Param("address") vaultAddress: Hex): VaultInfo | undefined {
    return this.appService.getVault(vaultAddress);
  }

  @Get("/strategies")
  getStrategies(): StrategyInfo[] {
    return this.appService.getStrategies();
  }

  @Get("/strategies/:address")
  getStrategy(
    @Param("address") strategyAddress: Hex
  ): StrategyInfo | undefined {
    return this.appService.getStrategy(strategyAddress);
  }
}
