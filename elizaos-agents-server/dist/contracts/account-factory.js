"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountFactory = void 0;
const web3_1 = require("../connections/web3");
const account_factory_1 = require("../abis/account-factory");
const provider_1 = require("../constants/provider");
class AccountFactory {
    async getAccount(owner) {
        try {
            const result = await web3_1.publicClient.readContract({
                address: provider_1.Provider.AccountFactory,
                abi: account_factory_1.accountFactoryABI,
                functionName: "getAccount",
                args: [owner],
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}
exports.AccountFactory = AccountFactory;
//# sourceMappingURL=account-factory.js.map