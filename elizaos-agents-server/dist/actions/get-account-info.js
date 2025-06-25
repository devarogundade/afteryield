"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountInfo = void 0;
const account_factory_1 = require("../contracts/account-factory");
const viem_1 = require("viem");
exports.getAccountInfo = {
    name: "getAccountInfo",
    description: "Fetches the smart account linked to a given user address.",
    similes: ["GET_ACCOUNT", "FETCH_ACCOUNT"],
    examples: [
        [{ name: "{{user}}", content: { text: "getAccountInfo 0xABC…" } }],
    ],
    validate: async (_runtime, message) => {
        const txt = message.content?.text;
        return /^getAccountInfo\s+0x[a-fA-F0-9]{40}$/.test(txt);
    },
    handler: async (runtime, message, state, _opts, callback) => {
        const match = (message.content?.text).match(/(0x[a-fA-F0-9]{40})$/);
        const userAddress = match?.[1];
        if (!userAddress) {
            callback?.({
                text: "Please provide a valid user address (e.g. getAccountInfo 0x123…).",
            });
            return false;
        }
        const account = await new account_factory_1.AccountFactory().getAccount(userAddress);
        const text = account && account !== viem_1.zeroAddress
            ? `🔗 Linked account: ${account}`
            : `❌ No linked account found for ${userAddress}.`;
        callback?.({ text, content: { account: account || null } });
        return true;
    },
};
//# sourceMappingURL=get-account-info.js.map