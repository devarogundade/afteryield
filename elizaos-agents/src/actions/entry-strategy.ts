import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
} from "@elizaos/core";
import { VaultService } from "../services/vault";
import type { Hex } from "viem";

export const entryStrategy: Action = {
  name: "entryStrategy",
  description: "Adds a new strategy contract to a vault.",
  similes: ["ADD_STRATEGY", "ENTRY_STRATEGY"],
  examples: [
    [
      {
        name: "{{user}}",
        content: {
          text: "entryStrategy 0xVaultAddress 0xStrategyAddress",
        },
      },
    ],
  ],
  validate: async (_rt, message) => {
    const t = message.content?.text as string;
    return /^entryStrategy\s+0x[a-fA-F0-9]{40}\s+0x[a-fA-F0-9]{40}$/.test(t);
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
      /^entryStrategy\s+(0x[a-fA-F0-9]{40})\s+(0x[a-fA-F0-9]{40})$/
    );
    if (!m) {
      callback?.({
        text: "Usage: entryStrategy <vaultAddress> <newStrategyAddress>",
      });
      return false;
    }
    const [, vaultAddress, newStrategy] = m;
    const svc = runtime.getService(VaultService.serviceType) as VaultService;

    const bytesResponse = svc.addStrategy(
      vaultAddress as Hex,
      newStrategy as Hex
    );

    const text = `Bytes response is ${bytesResponse}`;
    callback?.({
      text,
      content: { vaultAddress, newStrategy, bytesResponse },
    });
    return true;
  },
};
