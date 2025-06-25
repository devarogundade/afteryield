"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const core_1 = require("@elizaos/core");
const account_factory_1 = require("../contracts/account-factory");
const viem_1 = require("viem");
class AccountService extends core_1.Service {
    constructor() {
        super(...arguments);
        this.capabilityDescription = "Smart Account Lookup Service";
    }
    async lookupAccount(userAddress) {
        const account = await new account_factory_1.AccountFactory().getAccount(userAddress);
        return account !== viem_1.zeroAddress ? account : null;
    }
    async stop() { }
}
exports.AccountService = AccountService;
AccountService.serviceType = "AccountService";
//# sourceMappingURL=account.js.map