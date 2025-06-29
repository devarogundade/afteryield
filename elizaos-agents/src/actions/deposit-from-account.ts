import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
} from "@elizaos/core";
import { type Hex } from "viem";
import { VaultService } from "../services/vault";

export const depositFromAccount: Action = {
  name: "depositFromAccount",
  description:
    "Deposits a scaled amount from a user account into the given vault.",
  similes: ["DEPOSIT_VAULT", "DEPOSIT_FROM_ACCOUNT"],
  examples: [
    [
      {
        name: "{{user}}",
        content: {
          text: "depositFromAccount 0xVaultAddr 1000000000000000000 0xMyAccount",
        },
      },
    ],
  ],
  validate: async (_runtime, message) => {
    const txt = message.content?.text as string;
    return /^depositFromAccount\s+0x[a-fA-F0-9]{40}\s+\d+\s+0x[a-fA-F0-9]{40}$/.test(
      txt
    );
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    _state: State | undefined,
    _opts: unknown,
    callback?: HandlerCallback
  ) => {
    const t = message.content?.text as string;
    const m =
      t.match(
        /^depositFromAccount\s+(0x[a-fA-F0-9]{40})\s+(\d+)\s+(0x[a-fA-F0-9]{40})$/
      ) || [];

    if (!m) {
      callback?.({
        text: "Usage: depositFromAccount <vaultAddress> <amountScaled> <accountAddress>",
      });
      return false;
    }

    const [_, vaultAddress, amountStr, account] = m;
    const svc = runtime.getService(VaultService.serviceType) as VaultService;

    const amountScaled = BigInt(amountStr);
    const bytesResponse = svc.deposit(
      vaultAddress as Hex,
      amountScaled,
      account as Hex
    );

    const text = `Bytes response is ${bytesResponse}`;
    callback?.({
      text,
      content: { vaultAddress, amountScaled, account, bytesResponse },
    });
    return true;
  },
};
