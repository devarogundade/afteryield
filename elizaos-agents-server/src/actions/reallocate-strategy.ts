import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
} from "@elizaos/core";
import { VaultService } from "src/services/vault";
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
    _state: State,
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
    let txHash: string | null = null;
    try {
      txHash = await svc.reallocate(vaultAddress as Hex, allocations);
    } catch (err) {
      //   runtime.log()
    }

    const text = txHash
      ? `Successfully reallocated vault \`${vaultAddress}\`.\nNew allocations: [${allocations.join(
          ", "
        )}]\nTxHash: \`${txHash}\`.`
      : `Reallocation failed for vault \`${vaultAddress}\`.`;

    callback?.({
      text,
      content: { vaultAddress, allocations, txHash },
    });
    return true;
  },
};
