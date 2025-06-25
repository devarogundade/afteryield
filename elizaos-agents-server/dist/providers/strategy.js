"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyProvider = void 0;
const strategy_1 = require("../contracts/strategy");
exports.StrategyProvider = {
    name: "strategyProfile",
    description: "Fetches core details of a strategy contract.",
    dynamic: false,
    position: 0,
    private: false,
    async get(_runtime, _message, state) {
        const addr = state.params?.strategyAddress;
        if (!addr)
            return { values: {}, text: "No strategy address provided." };
        const strategy = new strategy_1.Strategy(addr);
        const vault = await strategy.getVault();
        const asset = await strategy.getAsset();
        const balance = await strategy.getBalanceOf();
        const balanceAsset = await strategy.getBalanceOfAsset();
        const balancePool = await strategy.getBalanceOfPool();
        return {
            values: { vault, asset, balance, balanceAsset, balancePool },
            text: `Strategy loaded: vault=${vault}, asset=${asset}`,
        };
    },
};
//# sourceMappingURL=strategy.js.map