import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
} from "@elizaos/core";
import { VaultService } from "../services/vault";
import type { Hex } from "viem";

export const exitStrategy: Action = {
  name: "exitStrategy",
  description:
    "Removes an active strategy from a vault and exits its position.",
  similes: ["EXIT_STRATEGY", "REMOVE_STRATEGY"],
  examples: [
    [
      {
        name: "{{user}}",
        content: {
          text: "exitStrategy 0xVaultAddress 0xStrategyToRemove",
        },
      },
    ],
  ],
  validate: async (_rt, message: Memory) => {
    const t = message.content?.text as string;
    return /^exitStrategy\s+0x[a-fA-F0-9]{40}\s+0x[a-fA-F0-9]{40}$/.test(t);
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    _state: State | undefined,
    _opts: unknown,
    callback?: HandlerCallback
  ) => {
    const t = message.content?.text as string;
    const m = t.match(
      /^exitStrategy\s+(0x[a-fA-F0-9]{40})\s+(0x[a-fA-F0-9]{40})$/
    );
    if (!m) {
      callback?.({
        text: "Usage: exitStrategy <vaultAddress> <strategyToRemoveAddress>",
      });
      return false;
    }
    const [, vaultAddress, strategyToRemove] = m;
    const svc = runtime.getService(VaultService.serviceType) as VaultService;

    const bytesResponse = svc.removeStrategy(
      vaultAddress as Hex,
      strategyToRemove as Hex
    );

    const text = `Bytes response is ${bytesResponse}`;
    callback?.({
      text,
      content: { vaultAddress, strategyToRemove, bytesResponse },
    });
    return true;
  },
};
