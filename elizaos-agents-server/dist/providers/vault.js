"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultProvider = void 0;
const vault_1 = require("../contracts/vault");
exports.VaultProvider = {
    name: "vaultProvider",
    description: `
    Fetches vault info for a specified address.
  `,
    dynamic: false,
    position: 0,
    async get(_runtime, _message, state) {
        const vaultAddress = state.params?.vaultAddress;
        if (!vaultAddress) {
            return { values: {}, text: "No vault address provided." };
        }
        const vault = new vault_1.Vault(vaultAddress);
        const balance = await vault.getBalance();
        const available = await vault.getAvailable();
        const summary = await vault.getSummary();
        const strategiesInUse = await vault.getStrategies();
        return {
            values: { vaultInfo: { balance, available, summary, strategiesInUse } },
            text: `Loaded vault data for ${vaultAddress}`,
        };
    },
};
//# sourceMappingURL=vault.js.map