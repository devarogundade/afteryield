import { StrategyInfo } from "../types";

const AAVE_USDC_STRATEGY: StrategyInfo = {
  address: "0x3a29d881BE12e928128F52EB568c99Ddb91F5007",
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
  vault: "0x975B445de301719d750064D9146B248EfB251373",
  feeId: 0,
  manager: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  feeRecipient: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  feeCollector: "0xF5fAA894536384c487710D88048F37792f66b914",
  strategist: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  swapRouter: "0x1D33c1AB462b09602936B1a60fE6Fc6fdCE865A6",
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
  address: "0x9BAD179fDa2Cf3Bfd51a1bbCA5C545392856EDAa",
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
  vault: "0x295B515831E34B1198Ffe5562A7d868BBAaf467e",
  feeId: 0,
  manager: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  feeRecipient: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  feeCollector: "0xF5fAA894536384c487710D88048F37792f66b914",
  strategist: "0x3E646e062F05e01e1860eA53a6DC81e7E9162DE6",
  swapRouter: "0x1D33c1AB462b09602936B1a60fE6Fc6fdCE865A6",
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
