import { Injectable } from "@nestjs/common";
import type { AfterYieldAgent, StrategyInfo, VaultInfo } from "./types";
import type { Hex } from "viem";
import { AGENTS } from "./constants/agent";
import { VAULTS } from "./constants/vault";
import { STRATEGIES } from "./constants/strategy";
import { InjectQueue } from "@nestjs/bullmq";
import VaultWorker from "./workers/vault-worker";
import { Queue } from "bullmq";

@Injectable()
export class AppService {
  constructor(@InjectQueue(VaultWorker.name) private vaultWorkerQueue: Queue) {
    AGENTS.forEach((character) => {
      this.vaultWorkerQueue.add(character.address, character).catch((error) => {
        console.log(error);
      });
    });
  }

  getAgents(): AfterYieldAgent[] {
    return AGENTS;
  }

  getAgent(agentAddress: Hex): AfterYieldAgent | undefined {
    return AGENTS.find((agent) => agent.address === agentAddress);
  }

  getVaults(): VaultInfo[] {
    return VAULTS;
  }

  getVault(vaultAddress: Hex): VaultInfo | undefined {
    return VAULTS.find((vault) => vault.address === vaultAddress);
  }

  getStrategies(): StrategyInfo[] {
    return STRATEGIES;
  }

  getStrategy(strategyAddress: Hex): StrategyInfo | undefined {
    return STRATEGIES.find((strategy) => strategy.address === strategyAddress);
  }
}
