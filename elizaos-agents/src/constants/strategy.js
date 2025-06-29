"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRATEGIES = exports.AAVE_LINK_STRATEGY = exports.AAVE_USDC_STRATEGY = void 0;
var AAVE_USDC_STRATEGY = {
    address: "0x9b081D3dEa910862da428a65Bf22518C184E403B",
    name: "AAVE USDC Strategy",
    asset: {
        name: "USDC",
        address: "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
        symbol: "USDC",
        icon: "/images/usdc.png",
        decimals: 6,
    },
    platformAssets: [
        {
            name: "USDC",
            address: "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
            symbol: "USDC",
            icon: "/images/usdc.png",
            decimals: 6,
        },
    ],
    rewardTokens: [],
    apy: 24980,
    dailyApy: 8130,
    tvl: 443,
    safety: 80,
    vault: "0x7539de641e4bf34d79C3FB5dC19cd56BC4d52990",
    feeId: 0,
    manager: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
    feeRecipient: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
    feeCollector: "0x8686F62a11EC9441572436b0d39dEed936845DD3",
    strategist: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    swapRouter: "0xb098a99693Cded13E1BCF35D5F7101008EF752c9",
    fees: {
        depositFee: 0,
        withdrawFee: 0,
    },
    platform: {
        name: "AAVE",
        website: "https://app.aave.com",
        icon: "/images/aave.png",
    },
    lastHarvest: new Date(),
};
exports.AAVE_USDC_STRATEGY = AAVE_USDC_STRATEGY;
var AAVE_LINK_STRATEGY = {
    address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    name: "AAVE LINK Strategy",
    asset: {
        name: "Chainlink",
        address: "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26",
        symbol: "LINK",
        icon: "/images/link.png",
        decimals: 18,
    },
    platformAssets: [
        {
            name: "Chainlink",
            address: "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26",
            symbol: "LINK",
            icon: "/images/link.png",
            decimals: 18,
        },
    ],
    rewardTokens: [],
    apy: 84733,
    dailyApy: 10468,
    tvl: 86412,
    safety: 80,
    vault: "0xAe140a39625119551A1E9e4E82FAF354B48Ec948",
    feeId: 0,
    manager: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
    feeRecipient: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
    feeCollector: "0x8686F62a11EC9441572436b0d39dEed936845DD3",
    strategist: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    swapRouter: "0xb098a99693Cded13E1BCF35D5F7101008EF752c9",
    fees: {
        depositFee: 0,
        withdrawFee: 0,
    },
    platform: {
        name: "AAVE",
        website: "https://app.aave.com",
        icon: "/images/aave.png",
    },
    lastHarvest: new Date(),
};
exports.AAVE_LINK_STRATEGY = AAVE_LINK_STRATEGY;
var STRATEGIES = [AAVE_USDC_STRATEGY, AAVE_LINK_STRATEGY];
exports.STRATEGIES = STRATEGIES;
