import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
} from "@elizaos/core";
import { StrategyService } from "src/services/strategy";
import type { Hex } from "viem";

export const profileStrategy: Action = {
  name: "profileStrategy",
  description:
    "Gathers on-chain stats for a strategy (vault, asset, balances, allocation).",
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
    const t = message.content?.text as string;
    return /^profileStrategy\s+0x[a-fA-F0-9]{40}$/.test(t);
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    _state: State,
    _opts: unknown,
    callback?: HandlerCallback
  ) => {
    const txt = message.content?.text as string;
    const m = txt.match(/(0x[a-fA-F0-9]{40})$/);
    if (!m) {
      callback?.({
        text: "Usage: profileStrategy <strategyAddress> (e.g. 0x123...abc)",
      });
      return false;
    }
    const stratAddr = m[1] as Hex;
    const svc = runtime.getService(
      StrategyService.serviceType
    ) as StrategyService;

    let data;
    try {
      data = await svc.profile(stratAddr);
    } catch (err) {
      // runtime.log()
      callback?.({
        text: "Error profiling strategy—check logs for details.",
      });
      return false;
    }

    const { vault, asset, balance, balanceAsset, balancePool, allocation } =
      data;

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
