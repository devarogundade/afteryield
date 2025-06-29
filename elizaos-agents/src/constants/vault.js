"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAULTS = void 0;
var strategy_1 = require("./strategy");
var VAULTS = [
    {
        address: "0x7539de641e4bf34d79C3FB5dC19cd56BC4d52990",
        agentAddress: "0xDDd09e89D654F284da540B8AbC5C6Fe8ED330d8b",
        name: "USDC",
        image: "/images/usdc.png",
        asset: {
            name: "USDC",
            address: "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
            symbol: "USDC",
            icon: "/images/usdc.png",
            decimals: 6,
        },
        allSupportedStrategies: [strategy_1.AAVE_USDC_STRATEGY],
    },
    {
        address: "0xAe140a39625119551A1E9e4E82FAF354B48Ec948",
        agentAddress: "0x85D365964271383c095c730dfC5679267b6173b9",
        name: "Chainlink",
        image: "/images/chainlink.png",
        asset: {
            name: "LINK",
            address: "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26",
            symbol: "LINK",
            icon: "/images/link.png",
            decimals: 18,
        },
        allSupportedStrategies: [strategy_1.AAVE_LINK_STRATEGY],
    },
];
exports.VAULTS = VAULTS;
