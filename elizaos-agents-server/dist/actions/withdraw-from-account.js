"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawToAccount = void 0;
const vault_1 = require("../services/vault");
exports.withdrawToAccount = {
    name: "withdrawToAccount",
    description: "Redeems LP tokens from the specified vault and sends assets to the account.",
    similes: ["WITHDRAW_VAULT", "REDEEM_LP"],
    examples: [
        [
            {
                name: "{{user}}",
                content: { text: "withdrawToAccount 0xVaultAddress 1000 0xMyAccount" },
            },
            {
                name: "Agent",
                content: {
                    text: "Redeeming LP tokens...",
                    action: "withdrawToAccount",
                },
            },
        ],
    ],
    validate: async (_runtime, message) => {
        const t = message.content?.text;
        return /^withdrawToAccount\s+0x[a-fA-F0-9]{40}\s+\d+\s+0x[a-fA-F0-9]{40}$/.test(t);
    },
    handler: async (runtime, message, __, ___, callback) => {
        const t = message.content?.text;
        const m = t.match(/^withdrawToAccount\s+(0x[a-fA-F0-9]{40})\s+(\d+)\s+(0x[a-fA-F0-9]{40})$/);
        if (!m) {
            callback?.({
                text: "Usage: withdrawToAccount <vaultAddress> <lpAmount> <accountAddress>",
            });
            return false;
        }
        const [_, vaultAddress, lpStr, account] = m;
        const lpAmount = BigInt(lpStr);
        const svc = runtime.getService(vault_1.VaultService.serviceType);
        let txHash = null;
        try {
            txHash = await svc.withdraw(vaultAddress, lpAmount, account);
        }
        catch (err) {
        }
        const text = txHash
            ? `Step success: Redeemed ${lpAmount} LP tokens from vault \`${vaultAddress}\`. Assets sent to: \`${account}\`. TxHash: \`${txHash}\`.`
            : `Withdrawal failed. Vault: \`${vaultAddress}\`, Account: \`${account}\`.`;
        callback?.({
            text,
            content: { vaultAddress, lpAmount, account, txHash },
        });
        return true;
    },
};
//# sourceMappingURL=withdraw-from-account.js.map