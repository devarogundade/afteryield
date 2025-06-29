import type { Hex } from "viem";

enum Trait {
  // Risk Profile
  RiskAverse = "RiskAverse",
  RiskNeutral = "RiskNeutral",
  RiskTolerant = "RiskTolerant",

  // Time Horizon
  ShortTerm = "ShortTerm",
  MediumTerm = "MediumTerm",
  LongTerm = "LongTerm",

  // Strategy Orientation
  YieldMaximizer = "YieldMaximizer",
  CapitalPreserver = "CapitalPreserver",
  BalancedGrowth = "BalancedGrowth",
  IncomeSeeker = "IncomeSeeker",

  // Asset Preferences
  StableOnly = "StableOnly",
  BlueChipOnly = "BlueChipOnly",
  VolatileAssetExposure = "VolatileAssetExposure",
  MultiAsset = "MultiAsset",
  ETHOnly = "ETHOnly",
  BTCOnly = "BTCOnly",

  // Reward Preferences
  AutoCompounder = "AutoCompounder",
  RewardClaimer = "RewardClaimer",
  Reinvestor = "Reinvestor",

  // Platform Preferences
  DecentralizedOnly = "DecentralizedOnly",
  TrustedProtocolsOnly = "TrustedProtocolsOnly",
  ExperimentalProtocolsAllowed = "ExperimentalProtocolsAllowed",

  // Fee Sensitivity
  LowFeeOnly = "LowFeeOnly",
  HighToleranceForFees = "HighToleranceForFees",

  // Automation Level
  FullyAutomated = "FullyAutomated",
  SemiAutomated = "SemiAutomated",
  ManualOverridesAllowed = "ManualOverridesAllowed",

  // Environmental or Ethical Preferences (if applicable)
  ESGCompliant = "ESGCompliant",
  GreenProjectsOnly = "GreenProjectsOnly",

  // Behavioral/Personality Traits
  Opportunistic = "Opportunistic",
  Conservative = "Conservative",
  Aggressive = "Aggressive",
  Adaptive = "Adaptive",
}

enum AutoPilotMode {
  Off,
  On,
}

enum ApprovalFlag {
  None,
  Deposit,
  Withdraw,
  All,
}

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Others",
}

type Token = {
  name: string;
  address: Hex;
  symbol: string;
  icon: string;
  decimals: number;
  price: number;
};

type AfterYieldAgent = {
  name: string;
  image: string;
  bioAudio: string;
  gender: Gender;
  address: Hex;
  model: string;
  riskFactor: number;
  traits: Trait[];
  vaults: VaultInfo[];
  username?: string;
  system?: string;
  bio: string | string[];
  topics?: string[];
  adjectives?: string[];
};

type VaultInfo = {
  address: Hex;
  agentAddress: Hex;
  name: string;
  image: string;
  asset: Token;
  allSupportedStrategies: StrategyInfo[];
};

type Fees = {
  depositFee: number;
  withdrawFee: number;
};

type Platform = {
  name: string;
  website: string;
  icon: string;
};

type StrategyInfo = {
  address: Hex;
  name: string;
  asset: Token;
  platformAssets: Token[];
  rewardTokens: Token[];
  apy: number;
  dailyApy: number;
  tvl: number;
  safety: number;
  vault: Hex;
  feeId: Hex;
  manager: Hex;
  feeRecipient: Hex;
  feeCollector: Hex;
  strategist: Hex;
  swapRouter: Hex;
  fees: Fees;
  platform: Platform;
  lastHarvest: Date;
};

type Notification = {
  title: string;
  description: string;
  category: string;
  linkTitle?: string;
  linkUrl?: string;
};

enum AssetType {
  StableCoin,
  BlueChips,
  Memes,
}

type ChartData = {
  name: string;
  pl: number;
};

export {
  Trait,
  Gender,
  ApprovalFlag,
  AfterYieldAgent,
  VaultInfo,
  StrategyInfo,
  AutoPilotMode,
  Token,
  Notification,
  AssetType,
  ChartData,
};
