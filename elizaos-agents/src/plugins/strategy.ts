// src/index.ts
import { Plugin } from "@elizaos/core";
import { entryStrategy } from "../actions/entry-strategy";
import { exitStrategy } from "../actions/exit-strategy";
import { profileStrategy } from "../actions/profile-strategy";
import { reAllocateStrategy } from "../actions/reallocate-strategy";
import { StrategyProvider } from "../providers/strategy";
import { StrategyService } from "../services/strategy";

export const StrategyPlugin: Plugin = {
  name: "strategy-plugin",
  description: `
    Fetches and outputs a strategy's vault, asset, balances, and allocation details.
    Adds a strategy contract to a vault's active list.
    `,
  providers: [StrategyProvider],
  services: [StrategyService],
  actions: [profileStrategy, entryStrategy, exitStrategy, reAllocateStrategy],
};
