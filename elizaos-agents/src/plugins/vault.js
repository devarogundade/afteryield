"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultPlugin = void 0;
var deposit_from_account_1 = require("../actions/deposit-from-account");
var withdraw_from_account_1 = require("../actions/withdraw-from-account");
var vault_1 = require("../providers/vault");
var vault_2 = require("../services/vault");
exports.VaultPlugin = {
    name: "vault-plugin",
    description: "\n    Enables vault deposits from user accounts.\n    Allows redeeming LP tokens and transferring assets to a user account.\n  ",
    providers: [vault_1.VaultProvider],
    services: [vault_2.VaultService],
    actions: [deposit_from_account_1.depositFromAccount, withdraw_from_account_1.withdrawToAccount],
};
