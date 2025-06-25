"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountProvider = void 0;
const account_factory_1 = require("../contracts/account-factory");
const viem_1 = require("viem");
exports.AccountProvider = {
    name: "account",
    description: "Retrieves linked smart account for a user address.",
    dynamic: false,
    position: 0,
    private: false,
    async get(runtime, message, state) {
        const userAddress = state.params?.userAddress;
        if (!userAddress) {
            return { values: { account: null }, text: "No user address provided." };
        }
        const factory = new account_factory_1.AccountFactory();
        const account = await factory.getAccount(userAddress);
        const linked = account !== viem_1.zeroAddress ? account : null;
        const text = linked
            ? `🔗 Found linked account for ${userAddress}: ${linked}`
            : `🔍 No account found for ${userAddress}.`;
        return {
            values: { account: linked },
            data: { userAddress, linkedAccount: linked },
            text,
        };
    },
};
//# sourceMappingURL=account.js.map