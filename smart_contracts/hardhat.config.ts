import { vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const MNEMONIC = vars.get("MNEMONIC");
// const AVALANCHE_API_KEY = vars.get("AVALANCHE_API_KEY");

module.exports = {
  mocha: {
    timeout: 100000000,
  },
  solidity: {
    version: "0.8.28",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: {
        privateKey:
          "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      },
    },
    avalancheFuji: {
      url: `https://avalanche-fuji-c-chain-rpc.publicnode.com`,
      chainId: 43113,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
  etherscan: {
    // apiKey: {
    //   avalancheFuji: AVALANCHE_API_KEY,
    // },
    customChains: [
      {
        network: "avalancheFuji",
        chainId: 43113,
        urls: {
          apiURL: "https://api-testnet.snowtrace.io",
          browserURL: "https://testnet.snowtrace.io",
        },
      },
    ],
  },
};
