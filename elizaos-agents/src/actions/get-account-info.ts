import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
} from "@elizaos/core";
import { AccountFactory } from "../contracts/account-factory";
import { Hex, zeroAddress } from "viem";

export const getAccountInfo: Action = {
  name: "getAccountInfo",
  description: "Fetches the smart account linked to a given user address.",
  similes: ["GET_ACCOUNT", "FETCH_ACCOUNT"],
  examples: [
    [{ name: "{{user}}", content: { text: "getAccountInfo 0xABC…" } }],
  ],
  validate: async (_runtime, message) => {
    const txt = message.content?.text as string;
    return /^getAccountInfo\s+0x[a-fA-F0-9]{40}$/.test(txt);
  },
  handler: async (
    _runtime: IAgentRuntime,
    message: Memory,
    _state: State | undefined,
    _opts: unknown,
    callback?: HandlerCallback
  ) => {
    const match = (message.content?.text as string).match(
      /(0x[a-fA-F0-9]{40})$/
    );
    const userAddress = match?.[1] as Hex | undefined;

    if (!userAddress) {
      callback?.({
        text: "Please provide a valid user address (e.g. getAccountInfo 0x123…).",
      });
      return false;
    }

    const account = await new AccountFactory().getAccount(userAddress);
    const text =
      account && account !== zeroAddress
        ? `Linked account: ${account}`
        : `No linked account found for ${userAddress}.`;

    callback?.({ text, content: { account: account || null } });
    return true;
  },
};
