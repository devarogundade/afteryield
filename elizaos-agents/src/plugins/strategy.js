"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyPlugin = void 0;
var entry_strategy_1 = require("../actions/entry-strategy");
var exit_strategy_1 = require("../actions/exit-strategy");
var profile_strategy_1 = require("../actions/profile-strategy");
var reallocate_strategy_1 = require("../actions/reallocate-strategy");
var strategy_1 = require("../providers/strategy");
var strategy_2 = require("../services/strategy");
exports.StrategyPlugin = {
    name: "strategy-plugin",
    description: "\n    Fetches and outputs a strategy's vault, asset, balances, and allocation details.\n    Adds a strategy contract to a vault's active list.\n    ",
    providers: [strategy_1.StrategyProvider],
    services: [strategy_2.StrategyService],
    actions: [profile_strategy_1.profileStrategy, entry_strategy_1.entryStrategy, exit_strategy_1.exitStrategy, reallocate_strategy_1.reAllocateStrategy],
};
