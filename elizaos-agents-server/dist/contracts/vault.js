"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vault = void 0;
const web3_1 = require("../connections/web3");
const vault_1 = require("../abis/vault");
const vault_2 = require("../constants/vault");
class Vault {
    constructor(vaultAddress) {
        const vaultInfo = vault_2.VAULTS.find((vault) => vault.address === vaultAddress);
        if (!vaultInfo)
            throw new Error("Vault not found!");
        this.vaultInfo = vaultInfo;
    }
    async depositFromAccount(amountScaled, account) {
        try {
            return await web3_1.walletClient.writeContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "depositFromAccount",
                args: [amountScaled, account],
            });
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async withdrawToAccount(lpAmount, account) {
        try {
            return await web3_1.walletClient.writeContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "withdrawToAccount",
                args: [lpAmount, account],
            });
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async withdrawAllToAccount(account) {
        try {
            return await web3_1.walletClient.writeContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "withdrawAllToAccount",
                args: [account],
            });
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async addStrategy(newStrategy) {
        try {
            return await web3_1.walletClient.writeContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "addStrategy",
                args: [newStrategy],
            });
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async removeStrategy(strategyToRemove) {
        try {
            return await web3_1.walletClient.writeContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "removeStrategy",
                args: [strategyToRemove],
            });
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async reallocate(allocations) {
        try {
            return await web3_1.walletClient.writeContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "reallocate",
                args: [allocations],
            });
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async getShares(lpAmount) {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "getShares",
                args: [lpAmount],
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return BigInt(0);
        }
    }
    async getBalance() {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "getBalance",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return BigInt(0);
        }
    }
    async getAvailable() {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "getAvailable",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return BigInt(0);
        }
    }
    async getAllocation(strategy) {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "getAllocation",
                args: [strategy],
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return BigInt(0);
        }
    }
    async getSummary() {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "getSummary",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return {
                allocated: BigInt(0),
                idle: BigInt(0),
            };
        }
    }
    async getStrategies() {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.vaultInfo.address,
                abi: vault_1.vaultABI,
                functionName: "getStrategies",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
}
exports.Vault = Vault;
//# sourceMappingURL=vault.js.map