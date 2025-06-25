"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyPlugin = void 0;
const entry_strategy_1 = require("../actions/entry-strategy");
const exit_strategy_1 = require("../actions/exit-strategy");
const profile_strategy_1 = require("../actions/profile-strategy");
const reallocate_strategy_1 = require("../actions/reallocate-strategy");
const strategy_1 = require("../providers/strategy");
const strategy_2 = require("../services/strategy");
exports.StrategyPlugin = {
    name: "strategy-plugin",
    description: `
    Fetches and outputs a strategy's vault, asset, balances, and allocation details.
    Adds a strategy contract to a vault's active list.
    `,
    providers: [strategy_1.StrategyProvider],
    services: [strategy_2.StrategyService],
    actions: [profile_strategy_1.profileStrategy, entry_strategy_1.entryStrategy, exit_strategy_1.exitStrategy, reallocate_strategy_1.reAllocateStrategy],
};
//# sourceMappingURL=strategy.js.map