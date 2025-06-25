// src/index.ts
import { Plugin } from "@elizaos/core";
import { entryStrategy } from "src/actions/entry-strategy";
import { exitStrategy } from "src/actions/exit-strategy";
import { profileStrategy } from "src/actions/profile-strategy";
import { reAllocateStrategy } from "src/actions/reallocate-strategy";
import { StrategyProvider } from "src/providers/strategy";
import { StrategyService } from "src/services/strategy";

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
