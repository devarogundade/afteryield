import { Character } from "@elizaos/core";
import { Hex } from "viem";
declare enum Trait {
    RiskAverse = "RiskAverse",
    RiskNeutral = "RiskNeutral",
    RiskTolerant = "RiskTolerant",
    ShortTerm = "ShortTerm",
    MediumTerm = "MediumTerm",
    LongTerm = "LongTerm",
    YieldMaximizer = "YieldMaximizer",
    CapitalPreserver = "CapitalPreserver",
    BalancedGrowth = "BalancedGrowth",
    IncomeSeeker = "IncomeSeeker",
    StableOnly = "StableOnly",
    BlueChipOnly = "BlueChipOnly",
    VolatileAssetExposure = "VolatileAssetExposure",
    MultiAsset = "MultiAsset",
    ETHOnly = "ETHOnly",
    BTCOnly = "BTCOnly",
    AutoCompounder = "AutoCompounder",
    RewardClaimer = "RewardClaimer",
    Reinvestor = "Reinvestor",
    DecentralizedOnly = "DecentralizedOnly",
    TrustedProtocolsOnly = "TrustedProtocolsOnly",
    ExperimentalProtocolsAllowed = "ExperimentalProtocolsAllowed",
    LowFeeOnly = "LowFeeOnly",
    HighToleranceForFees = "HighToleranceForFees",
    FullyAutomated = "FullyAutomated",
    SemiAutomated = "SemiAutomated",
    ManualOverridesAllowed = "ManualOverridesAllowed",
    ESGCompliant = "ESGCompliant",
    GreenProjectsOnly = "GreenProjectsOnly",
    Opportunistic = "Opportunistic",
    Conservative = "Conservative",
    Aggressive = "Aggressive",
    Adaptive = "Adaptive"
}
declare enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Others"
}
type Token = {
    name: string;
    address: Hex;
    symbol: string;
    icon: string;
    decimals: number;
};
type AfterYieldAgent = Character & {
    name: string;
    image: string;
    bioAudio: string;
    gender: Gender;
    address: Hex;
    model: string;
    riskFactor: number;
    traits: Trait[];
    vaults: VaultInfo[];
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
};
type StrategyInfo = {
    address: Hex;
    name: string;
    asset: Token;
    platformAssets: Token[];
    rewardToken: Token | undefined;
    apy: number;
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
};
export { Trait, Gender, AfterYieldAgent, VaultInfo, StrategyInfo };
