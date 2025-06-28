import { Provider } from "@elizaos/core";
import { Strategy } from "../contracts/strategy";
import type { Hex } from "viem";

export const StrategyProvider: Provider = {
  name: "strategyProfile",
  description: "Fetches core details of a strategy contract.",
  dynamic: false,
  position: 0,
  private: false,
  async get(_runtime, _message, state) {
    const addr = state.params?.strategyAddress as Hex | undefined;
    if (!addr) return { values: {}, text: "No strategy address provided." };

    const strategy = new Strategy(addr);
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
