import { Plugin } from "@elizaos/core";
import { depositFromAccount } from "src/actions/deposit-from-account";
import { withdrawToAccount } from "src/actions/withdraw-from-account";
import { VaultProvider } from "src/providers/vault";
import { VaultService } from "src/services/vault";

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
