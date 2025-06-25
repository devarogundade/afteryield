"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAULTS = void 0;
const strategy_1 = require("./strategy");
const VAULTS = [
    {
        address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
        agentAddress: "0x1111",
        name: "Uniswap ETH-USDC",
        image: "",
        asset: {
            name: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
            address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
            symbol: "USDC",
            icon: "https://afteryield.com/images/usdc.png",
            decimals: 6,
        },
        allSupportedStrategies: [strategy_1.UNISWAP_ETH_USDC_STRATEGY],
    },
];
exports.VAULTS = VAULTS;
//# sourceMappingURL=vault.js.map