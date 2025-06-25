"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyService = void 0;
const core_1 = require("@elizaos/core");
const strategy_1 = require("../contracts/strategy");
const vault_1 = require("../contracts/vault");
class StrategyService extends core_1.Service {
    constructor() {
        super(...arguments);
        this.capabilityDescription = "Provides strategy & vault profiling";
    }
    async profile(strategyAddress) {
        const strategy = new strategy_1.Strategy(strategyAddress);
        const vault = await strategy.getVault();
        const asset = await strategy.getAsset();
        const balance = await strategy.getBalanceOf();
        const balanceAsset = await strategy.getBalanceOfAsset();
        const balancePool = await strategy.getBalanceOfPool();
        if (!vault || !asset)
            throw new Error("");
        const v = new vault_1.Vault(vault);
        const allocation = await v.getAllocation(strategyAddress);
        return { vault, asset, balance, balanceAsset, balancePool, allocation };
    }
    async stop() { }
}
exports.StrategyService = StrategyService;
StrategyService.serviceType = "StrategyService";
//# sourceMappingURL=strategy.js.map