import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
} from "@elizaos/core";
import { Vault } from "../contracts/vault";
import { type Hex } from "viem";

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
    _runtime: IAgentRuntime,
    message: Memory,
    _state: State | undefined,
    _opts: unknown,
    callback?: HandlerCallback
  ) => {
    const txt = message.content?.text as string;
    const [, vaultAddress, amountStr, account] =
      txt.match(
        /^depositFromAccount\s+(0x[a-fA-F0-9]{40})\s+(\d+)\s+(0x[a-fA-F0-9]{40})$/
      ) || [];

    if (!vaultAddress || !amountStr || !account) {
      callback?.({
        text: "Usage: depositFromAccount <vaultAddress> <amountScaled> <accountAddress>",
      });
      return false;
    }

    const amountScaled = BigInt(amountStr);
    const vault = new Vault(vaultAddress as Hex);
    let txHash: string | null = null;
    try {
      txHash = await vault.depositFromAccount(amountScaled, account as Hex);
    } catch (err) {
      // runtime.log()
    }

    const text = txHash
      ? `Successfully deposited ${amountScaled} units from \`${account}\` into vault \`${vaultAddress}\`.\nTransaction: \`${txHash}\``
      : `Failed to deposit ${amountScaled} units from \`${account}\` into vault \`${vaultAddress}\`.`;
    callback?.({
      text,
      content: { vaultAddress, amountScaled, account, txHash },
    });
    return true;
  },
};
