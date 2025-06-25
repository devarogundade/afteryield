"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitStrategy = void 0;
const vault_1 = require("../services/vault");
exports.exitStrategy = {
    name: "exitStrategy",
    description: "Removes an active strategy from a vault and exits its position.",
    similes: ["EXIT_STRATEGY", "REMOVE_STRATEGY"],
    examples: [
        [
            {
                name: "{{user}}",
                content: {
                    text: "exitStrategy 0xVaultAddress 0xStrategyToRemove",
                },
            },
        ],
    ],
    validate: async (_rt, message) => {
        const t = message.content?.text;
        return /^exitStrategy\s+0x[a-fA-F0-9]{40}\s+0x[a-fA-F0-9]{40}$/.test(t);
    },
    handler: async (runtime, message, _state, _opts, callback) => {
        const t = message.content?.text;
        const m = t.match(/^exitStrategy\s+(0x[a-fA-F0-9]{40})\s+(0x[a-fA-F0-9]{40})$/);
        if (!m) {
            callback?.({
                text: "Usage: exitStrategy <vaultAddress> <strategyToRemoveAddress>",
            });
            return false;
        }
        const [, vaultAddress, strategy] = m;
        const svc = runtime.getService(vault_1.VaultService.serviceType);
        let txHash = null;
        try {
            txHash = await svc.removeStrategy(vaultAddress, strategy);
        }
        catch (err) {
        }
        const text = txHash
            ? `Successfully exited strategy \`${strategy}\` from vault \`${vaultAddress}\`.\nTxHash: \`${txHash}\`.`
            : `Failed to exit strategy \`${strategy}\` from vault \`${vaultAddress}\`.`;
        callback?.({
            text,
            content: { vaultAddress, strategy, txHash },
        });
        return true;
    },
};
//# sourceMappingURL=exit-strategy.js.map