"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryStrategy = void 0;
const vault_1 = require("../services/vault");
exports.entryStrategy = {
    name: "entryStrategy",
    description: "Adds a new strategy contract to a vault.",
    similes: ["ADD_STRATEGY", "ENTRY_STRATEGY"],
    examples: [
        [
            {
                name: "{{user}}",
                content: {
                    text: "entryStrategy 0xVaultAddress 0xStrategyAddress",
                },
            },
        ],
    ],
    validate: async (_rt, message) => {
        const t = message.content?.text;
        return /^entryStrategy\s+0x[a-fA-F0-9]{40}\s+0x[a-fA-F0-9]{40}$/.test(t);
    },
    handler: async (runtime, message, _state, _opts, callback) => {
        const t = message.content?.text;
        const m = t.match(/^entryStrategy\s+(0x[a-fA-F0-9]{40})\s+(0x[a-fA-F0-9]{40})$/);
        if (!m) {
            callback?.({
                text: "Usage: entryStrategy <vaultAddress> <newStrategyAddress>",
            });
            return false;
        }
        const [, vaultAddress, newStrategy] = m;
        const svc = runtime.getService(vault_1.VaultService.serviceType);
        let txHash = null;
        try {
            txHash = await svc.addStrategy(vaultAddress, newStrategy);
        }
        catch (err) {
        }
        const text = txHash
            ? `Successfully added strategy \`${newStrategy}\` to vault \`${vaultAddress}\`.\nTxHash: \`${txHash}\`.`
            : `Failed to add strategy \`${newStrategy}\` to vault \`${vaultAddress}\`.`;
        callback?.({
            text,
            content: { vaultAddress, newStrategy, txHash },
        });
        return true;
    },
};
//# sourceMappingURL=entry-strategy.js.map