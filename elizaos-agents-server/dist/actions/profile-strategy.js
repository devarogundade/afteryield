"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileStrategy = void 0;
const strategy_1 = require("../services/strategy");
exports.profileStrategy = {
    name: "profileStrategy",
    description: "Gathers on-chain stats for a strategy (vault, asset, balances, allocation).",
    similes: ["PROFILE_STRATEGY"],
    examples: [
        [
            {
                name: "{{user}}",
                content: {
                    text: "profileStrategy 0xStrategyAddress",
                },
            },
        ],
    ],
    validate: async (_rt, message) => {
        const t = message.content?.text;
        return /^profileStrategy\s+0x[a-fA-F0-9]{40}$/.test(t);
    },
    handler: async (runtime, message, _state, _opts, callback) => {
        const txt = message.content?.text;
        const m = txt.match(/(0x[a-fA-F0-9]{40})$/);
        if (!m) {
            callback?.({
                text: "Usage: profileStrategy <strategyAddress> (e.g. 0x123...abc)",
            });
            return false;
        }
        const stratAddr = m[1];
        const svc = runtime.getService(strategy_1.StrategyService.serviceType);
        let data;
        try {
            data = await svc.profile(stratAddr);
        }
        catch (err) {
            callback?.({
                text: "Error profiling strategy—check logs for details.",
            });
            return false;
        }
        const { vault, asset, balance, balanceAsset, balancePool, allocation } = data;
        const textLines = [
            `Strategy Profile for ${stratAddr}`,
            `Vault: ${vault ?? "None"}`,
            `Asset: ${asset}`,
            `Agent Balance: ${balance}`,
            `Asset-value Balance: ${balanceAsset}`,
            `Pool Balance: ${balancePool}`,
            `Allocation in Vault: ${allocation}`,
        ];
        callback?.({
            text: textLines.join("\n"),
            content: data,
        });
        return true;
    },
};
//# sourceMappingURL=profile-strategy.js.map