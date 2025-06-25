"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRATEGIES = exports.UNISWAP_ETH_USDC_STRATEGY = void 0;
const UNISWAP_ETH_USDC_STRATEGY = {
    address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    name: "Uniswap ETH-USDC Pool",
    asset: {
        name: "ETH-USDC LP",
        address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
        symbol: "ETHUSDC",
        icon: "",
        decimals: 6,
    },
    platformAssets: [
        {
            name: "ETH",
            address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
            symbol: "ETH",
            icon: "",
            decimals: 18,
        },
        {
            name: "USDC",
            address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
            symbol: "USDC",
            icon: "",
            decimals: 6,
        },
    ],
    rewardToken: undefined,
    apy: 4980,
    safety: 80,
    vault: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    feeId: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    manager: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    feeRecipient: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    feeCollector: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    strategist: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    swapRouter: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    fees: {
        depositFee: 0,
        withdrawFee: 10,
    },
    platform: {
        name: "Uniswap",
        website: "",
    },
};
exports.UNISWAP_ETH_USDC_STRATEGY = UNISWAP_ETH_USDC_STRATEGY;
const STRATEGIES = [UNISWAP_ETH_USDC_STRATEGY];
exports.STRATEGIES = STRATEGIES;
//# sourceMappingURL=strategy.js.map