import { Service } from "@elizaos/core";
import { AccountFactory } from "../contracts/account-factory";
import { Hex, zeroAddress } from "viem";

export class AccountService extends Service {
  static serviceType = "AccountService";

  capabilityDescription = "Smart Account Lookup Service";

  async lookupAccount(userAddress: string): Promise<string | null> {
    const account = await new AccountFactory().getAccount(userAddress as Hex);
    return account !== zeroAddress ? account : null;
  }

  async stop(): Promise<void> {}
}
