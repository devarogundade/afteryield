import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
} from "@elizaos/core";
import { VaultService } from "../services/vault";
import type { Hex } from "viem";

export const withdrawToAccount: Action = {
  name: "withdrawToAccount",
  description:
    "Redeems LP tokens from the specified vault and sends assets to the account.",
  similes: ["WITHDRAW_VAULT", "REDEEM_LP"],
  examples: [
    [
      {
        name: "{{user}}",
        content: { text: "withdrawToAccount 0xVaultAddress 1000 0xMyAccount" },
      },
      {
        name: "Agent",
        content: {
          text: "Redeeming LP tokens...",
          action: "withdrawToAccount",
        },
      },
    ],
  ],
  validate: async (_runtime, message) => {
    const t = message.content?.text as string;
    return /^withdrawToAccount\s+0x[a-fA-F0-9]{40}\s+\d+\s+0x[a-fA-F0-9]{40}$/.test(
      t
    );
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    _state: State | undefined,
    __unkwown: unknown,
    callback?: HandlerCallback
  ) => {
    const t = message.content?.text as string;
    const m = t.match(
      /^withdrawToAccount\s+(0x[a-fA-F0-9]{40})\s+(\d+)\s+(0x[a-fA-F0-9]{40})$/
    );
    if (!m) {
      callback?.({
        text: "Usage: withdrawToAccount <vaultAddress> <lpAmount> <accountAddress>",
      });
      return false;
    }

    const [_, vaultAddress, lpStr, account] = m;
    const svc = runtime.getService(VaultService.serviceType) as VaultService;

    const lpAmount = BigInt(lpStr);
    const bytesResponse = svc.withdraw(
      vaultAddress as Hex,
      lpAmount,
      account as Hex
    );

    const text = `Bytes response is ${bytesResponse}`;
    callback?.({
      text,
      content: { vaultAddress, lpAmount, account, bytesResponse },
    });
    return true;
  },
};
