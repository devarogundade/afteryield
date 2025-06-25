"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = void 0;
const web3_1 = require("../connections/web3");
const strategy_1 = require("../abis/strategy");
const strategy_2 = require("../constants/strategy");
class Strategy {
    constructor(strategyAddress) {
        const strategyInfo = strategy_2.STRATEGIES.find((strategy) => strategy.address === strategyAddress);
        if (!strategyInfo)
            throw new Error("Strategy not found!");
        this.strategyInfo = strategyInfo;
    }
    async harvest() {
        try {
            const result = await web3_1.walletClient.writeContract({
                address: this.strategyInfo.address,
                abi: strategy_1.strategyABI,
                functionName: "harvest",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async getVault() {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.strategyInfo.address,
                abi: strategy_1.strategyABI,
                functionName: "getVault",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async getAsset() {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.strategyInfo.address,
                abi: strategy_1.strategyABI,
                functionName: "getAsset",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async getBalanceOf() {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.strategyInfo.address,
                abi: strategy_1.strategyABI,
                functionName: "getBalanceOf",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return BigInt(0);
        }
    }
    async getBalanceOfAsset() {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.strategyInfo.address,
                abi: strategy_1.strategyABI,
                functionName: "getBalanceOfAsset",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return BigInt(0);
        }
    }
    async getBalanceOfPool() {
        try {
            const result = await web3_1.publicClient.readContract({
                address: this.strategyInfo.address,
                abi: strategy_1.strategyABI,
                functionName: "getBalanceOfPool",
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return BigInt(0);
        }
    }
}
exports.Strategy = Strategy;
//# sourceMappingURL=strategy.js.map