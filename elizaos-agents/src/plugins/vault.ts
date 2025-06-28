import { Plugin } from "@elizaos/core";
import { depositFromAccount } from "../actions/deposit-from-account";
import { withdrawToAccount } from "../actions/withdraw-from-account";
import { VaultProvider } from "../providers/vault";
import { VaultService } from "../services/vault";

export const VaultPlugin: Plugin = {
  name: "vault-plugin",
  description: `
    Enables vault deposits from user accounts.
    Allows redeeming LP tokens and transferring assets to a user account.
  `,
  providers: [VaultProvider],
  services: [VaultService],
  actions: [depositFromAccount, withdrawToAccount],
};
