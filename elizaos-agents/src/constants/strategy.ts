import { StrategyInfo } from "../types";

const AAVE_USDC_STRATEGY: StrategyInfo = {
  address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
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
  vault: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
  feeId: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
  manager: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  feeRecipient: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  feeCollector: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
  strategist: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
  swapRouter: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
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

const AAVE_LINK_STRATEGY: StrategyInfo = {
  address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
  name: "AAVE LINK Strategy",
  asset: {
    name: "Chainlink",
    address: "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
    symbol: "LINK",
    icon: "/images/link.png",
    decimals: 18,
  },
  platformAssets: [
    {
      name: "Chainlink",
      address: "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
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
  vault: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
  feeId: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
  manager: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  feeRecipient: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  feeCollector: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
  strategist: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
  swapRouter: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
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

const STRATEGIES = [AAVE_USDC_STRATEGY, AAVE_LINK_STRATEGY];

export { AAVE_USDC_STRATEGY, AAVE_LINK_STRATEGY, STRATEGIES };
