"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletClient = exports.publicClient = void 0;
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const publicClient = (0, viem_1.createPublicClient)({
    chain: chains_1.avalancheFuji,
    transport: (0, viem_1.http)(),
});
exports.publicClient = publicClient;
const walletClient = (0, viem_1.createWalletClient)({
    account: "0x",
    chain: chains_1.avalancheFuji,
    transport: (0, viem_1.http)(),
});
exports.walletClient = walletClient;
//# sourceMappingURL=web3.js.map