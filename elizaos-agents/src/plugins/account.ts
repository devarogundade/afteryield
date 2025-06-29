import { Plugin } from "@elizaos/core";
import { getAccountInfo } from "../actions/get-account-info";
import { AccountProvider } from "../providers/account";
import { AccountService } from "../services/account";

export const AccountPlugin: Plugin = {
  name: "account-plugin",
  description: "Provides account lookup functionality.",
  providers: [AccountProvider],
  services: [AccountService],
  actions: [getAccountInfo],
};
