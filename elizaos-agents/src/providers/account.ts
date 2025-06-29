import { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";
import { AccountFactory } from "../contracts/account-factory";
import { Hex, zeroAddress } from "viem";

export const AccountProvider: Provider = {
  name: "account",
  description: "Retrieves linked smart account for a user address.",
  dynamic: false,
  position: 0,
  private: false,

  async get(_runtime: IAgentRuntime, _message: Memory, state: State) {
    const userAddress = state.params?.userAddress as Hex | undefined;
    if (!userAddress) {
      return { values: { account: null }, text: "No user address provided." };
    }
    const factory = new AccountFactory();
    const account = await factory.getAccount(userAddress);
    const linked = account !== zeroAddress ? account : null;
    const text = linked
      ? `🔗 Found linked account for ${userAddress}: ${linked}`
      : `🔍 No account found for ${userAddress}.`;
    return {
      values: { account: linked },
      data: { userAddress, linkedAccount: linked },
      text,
    };
  },
};
