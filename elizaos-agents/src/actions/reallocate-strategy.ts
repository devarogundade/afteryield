import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
} from "@elizaos/core";
import { VaultService } from "../services/vault";
import type { Hex } from "viem";

export const reAllocateStrategy: Action = {
  name: "reAllocateStrategy",
  description:
    "Redistributes vault assets among active strategies based on new allocation weights.",
  similes: ["REALLOCATE_VAULT", "SET_ALLOCATIONS"],
  examples: [
    [
      {
        name: "{{user}}",
        content: {
          text: "reAllocateStrategy 0xVaultAddress [3000,3000,4000]",
        },
      },
    ],
  ],
  validate: async (_rt, message: Memory) => {
    const t = message.content?.text as string;
    return /^reAllocateStrategy\s+0x[a-fA-F0-9]{40}\s+\[([\d]+,?)+\]$/.test(t);
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
      /^reAllocateStrategy\s+(0x[a-fA-F0-9]{40})\s+\[([\d,]+)\]$/
    );
    if (!m) {
      callback?.({
        text: "Usage: reAllocateStrategy <vaultAddress> [alloc1,alloc2,...]",
      });
      return false;
    }
    const [, vaultAddress, allocStr] = m;
    const allocations = allocStr.split(",").map((s) => Number(s));

    const svc = runtime.getService(VaultService.serviceType) as VaultService;

    const bytesResponse = svc.reallocate(
      vaultAddress as Hex,
      allocations.map((allocation) => BigInt(allocation))
    );

    const text = `Bytes response is ${bytesResponse}`;
    callback?.({
      text,
      content: { vaultAddress, allocations, bytesResponse },
    });
    return true;
  },
};
