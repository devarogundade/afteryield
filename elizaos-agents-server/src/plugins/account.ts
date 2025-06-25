import { Plugin } from "@elizaos/core";
import { getAccountInfo } from "src/actions/get-account-info";
import { AccountProvider } from "src/providers/account";
import { AccountService } from "src/services/account";

export const AccountPlugin: Plugin = {
  name: "account-plugin",
  description: "Provides account lookup functionality.",
  // models: {},
  providers: [AccountProvider],
  services: [AccountService],
  actions: [getAccountInfo],
};
