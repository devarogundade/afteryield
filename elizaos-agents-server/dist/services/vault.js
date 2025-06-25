"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultService = void 0;
const core_1 = require("@elizaos/core");
const vault_1 = require("../contracts/vault");
class VaultService extends core_1.Service {
    constructor() {
        super(...arguments);
        this.capabilityDescription = `
    Vault deposit and query service. 
    Handles withdrawals from a vault.
    Handles vault strategy entry operations.
    Handles vault strategy removal operations.
    Handles vault strategy reallocations.
    `;
    }
    async deposit(vaultAddress, amountScaled, account) {
        const vault = new vault_1.Vault(vaultAddress);
        const txHash = await vault.depositFromAccount(amountScaled, account);
        return txHash || null;
    }
    async withdraw(vaultAddress, lpAmount, account) {
        const vault = new vault_1.Vault(vaultAddress);
        return (await vault.withdrawToAccount(lpAmount, account)) || null;
    }
    async addStrategy(vaultAddress, newStrategy) {
        const vault = new vault_1.Vault(vaultAddress);
        return (await vault.addStrategy(newStrategy)) || null;
    }
    async removeStrategy(vaultAddress, strategyToRemove) {
        const vault = new vault_1.Vault(vaultAddress);
        return (await vault.removeStrategy(strategyToRemove)) || null;
    }
    async reallocate(vaultAddress, allocations) {
        const vault = new vault_1.Vault(vaultAddress);
        return (await vault.reallocate(allocations)) || null;
    }
    async stop() { }
}
exports.VaultService = VaultService;
VaultService.serviceType = "VaultService";
//# sourceMappingURL=vault.js.map