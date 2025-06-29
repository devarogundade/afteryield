"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPlugin = void 0;
var get_account_info_1 = require("../actions/get-account-info");
var account_1 = require("../providers/account");
var account_2 = require("../services/account");
exports.AccountPlugin = {
    name: "account-plugin",
    description: "Provides account lookup functionality.",
    providers: [account_1.AccountProvider],
    services: [account_2.AccountService],
    actions: [get_account_info_1.getAccountInfo],
};
