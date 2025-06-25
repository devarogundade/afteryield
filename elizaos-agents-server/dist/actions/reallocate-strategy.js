"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reAllocateStrategy = void 0;
const vault_1 = require("../services/vault");
exports.reAllocateStrategy = {
    name: "reAllocateStrategy",
    description: "Redistributes vault assets among active strategies based on new allocation weights.",
    similes: ["REALLOCATE_VAULT", "SET_ALLOCATIONS"],
    examples: [
        [
            {
                name: "{{user}}",
                content: {
                    text: "reAllocateStrategy 0xVaultAddress [3000,3000,4000]",
                },
            },
        ],
    ],
    validate: async (_rt, message) => {
        const t = message.content?.text;
        return /^reAllocateStrategy\s+0x[a-fA-F0-9]{40}\s+\[([\d]+,?)+\]$/.test(t);
    },
    handler: async (runtime, message, _state, _opts, callback) => {
        const t = message.content?.text;
        const m = t.match(/^reAllocateStrategy\s+(0x[a-fA-F0-9]{40})\s+\[([\d,]+)\]$/);
        if (!m) {
            callback?.({
                text: "Usage: reAllocateStrategy <vaultAddress> [alloc1,alloc2,...]",
            });
            return false;
        }
        const [, vaultAddress, allocStr] = m;
        const allocations = allocStr.split(",").map((s) => Number(s));
        const svc = runtime.getService(vault_1.VaultService.serviceType);
        let txHash = null;
        try {
            txHash = await svc.reallocate(vaultAddress, allocations);
        }
        catch (err) {
        }
        const text = txHash
            ? `Successfully reallocated vault \`${vaultAddress}\`.\nNew allocations: [${allocations.join(", ")}]\nTxHash: \`${txHash}\`.`
            : `Reallocation failed for vault \`${vaultAddress}\`.`;
        callback?.({
            text,
            content: { vaultAddress, allocations, txHash },
        });
        return true;
    },
};
//# sourceMappingURL=reallocate-strategy.js.map