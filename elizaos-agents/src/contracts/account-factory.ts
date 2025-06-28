import { publicClient } from "../connections/web3";
import { accountFactoryABI } from "../abis/account-factory";
import type { Hex } from "viem";
import { Provider } from "../constants/provider";

class AccountFactory {
  async getAccount(owner: Hex): Promise<Hex | null> {
    try {
      const result = await publicClient.readContract({
        address: Provider.AccountFactory,
        abi: accountFactoryABI,
        functionName: "getAccount",
        args: [owner],
      });

      return result as Hex;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }
}

export { AccountFactory };
