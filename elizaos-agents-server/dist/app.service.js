"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const agent_1 = require("./constants/agent");
const vault_1 = require("./constants/vault");
const strategy_1 = require("./constants/strategy");
let AppService = class AppService {
    getAgents() {
        return agent_1.AGENTS;
    }
    getAgent(agentAddress) {
        return agent_1.AGENTS.find((agent) => agent.address === agentAddress);
    }
    getVaults() {
        return vault_1.VAULTS;
    }
    getVault(vaultAddress) {
        return vault_1.VAULTS.find((vault) => vault.address === vaultAddress);
    }
    getStrategies() {
        return strategy_1.STRATEGIES;
    }
    getStrategy(strategyAddress) {
        return strategy_1.STRATEGIES.find((strategy) => strategy.address === strategyAddress);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map