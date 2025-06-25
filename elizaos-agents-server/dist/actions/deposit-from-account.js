"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositFromAccount = void 0;
const vault_1 = require("../contracts/vault");
exports.depositFromAccount = {
    name: "depositFromAccount",
    description: "Deposits a scaled amount from a user account into the given vault.",
    similes: ["DEPOSIT_VAULT", "DEPOSIT_FROM_ACCOUNT"],
    examples: [
        [
            {
                name: "{{user}}",
                content: {
                    text: "depositFromAccount 0xVaultAddr 1000000000000000000 0xMyAccount",
                },
            },
        ],
    ],
    validate: async (_runtime, message) => {
        const txt = message.content?.text;
        return /^depositFromAccount\s+0x[a-fA-F0-9]{40}\s+\d+\s+0x[a-fA-F0-9]{40}$/.test(txt);
    },
    handler: async (runtime, message, state, _opts, callback) => {
        const txt = message.content?.text;
        const [, vaultAddress, amountStr, account] = txt.match(/^depositFromAccount\s+(0x[a-fA-F0-9]{40})\s+(\d+)\s+(0x[a-fA-F0-9]{40})$/) || [];
        if (!vaultAddress || !amountStr || !account) {
            callback?.({
                text: "Usage: depositFromAccount <vaultAddress> <amountScaled> <accountAddress>",
            });
            return false;
        }
        const amountScaled = BigInt(amountStr);
        const vault = new vault_1.Vault(vaultAddress);
        let txHash = null;
        try {
            txHash = await vault.depositFromAccount(amountScaled, account);
        }
        catch (err) {
        }
        const text = txHash
            ? `Successfully deposited ${amountScaled} units from \`${account}\` into vault \`${vaultAddress}\`.\nTransaction: \`${txHash}\``
            : `Failed to deposit ${amountScaled} units from \`${account}\` into vault \`${vaultAddress}\`.`;
        callback?.({
            text,
            content: { vaultAddress, amountScaled, account, txHash },
        });
        return true;
    },
};
//# sourceMappingURL=deposit-from-account.js.map