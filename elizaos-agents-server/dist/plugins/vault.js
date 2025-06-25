"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultPlugin = void 0;
const deposit_from_account_1 = require("../actions/deposit-from-account");
const withdraw_from_account_1 = require("../actions/withdraw-from-account");
const vault_1 = require("../providers/vault");
const vault_2 = require("../services/vault");
exports.VaultPlugin = {
    name: "vault-plugin",
    description: `
    Enables vault deposits from user accounts.
    Allows redeeming LP tokens and transferring assets to a user account.
  `,
    providers: [vault_1.VaultProvider],
    services: [vault_2.VaultService],
    actions: [deposit_from_account_1.depositFromAccount, withdraw_from_account_1.withdrawToAccount],
};
//# sourceMappingURL=vault.js.map