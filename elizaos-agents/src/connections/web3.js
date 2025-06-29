"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletClient = exports.publicClient = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var viem_1 = require("viem");
var accounts_1 = require("viem/accounts");
var chains_1 = require("viem/chains");
var publicClient = (0, viem_1.createPublicClient)({
    chain: chains_1.avalancheFuji,
    transport: (0, viem_1.http)(),
});
exports.publicClient = publicClient;
var walletClient = (0, viem_1.createWalletClient)({
    account: (0, accounts_1.mnemonicToAccount)(process.env.MNEMONIC),
    chain: chains_1.avalancheFuji,
    transport: (0, viem_1.http)(),
});
exports.walletClient = walletClient;
