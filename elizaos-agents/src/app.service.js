"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
var agent_1 = require("./constants/agent");
var vault_1 = require("./constants/vault");
var strategy_1 = require("./constants/strategy");
var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.prototype.getAgents = function () {
        return agent_1.AGENTS;
    };
    AppService.prototype.getAgent = function (agentAddress) {
        return agent_1.AGENTS.find(function (agent) { return agent.address === agentAddress; });
    };
    AppService.prototype.getVaults = function () {
        return vault_1.VAULTS;
    };
    AppService.prototype.getVault = function (vaultAddress) {
        return vault_1.VAULTS.find(function (vault) { return vault.address === vaultAddress; });
    };
    AppService.prototype.getStrategies = function () {
        return strategy_1.STRATEGIES;
    };
    AppService.prototype.getStrategy = function (strategyAddress) {
        return strategy_1.STRATEGIES.find(function (strategy) { return strategy.address === strategyAddress; });
    };
    return AppService;
}());
exports.AppService = AppService;
