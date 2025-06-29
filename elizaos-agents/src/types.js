"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.Trait = void 0;
var Trait;
(function (Trait) {
    // Risk Profile
    Trait["RiskAverse"] = "RiskAverse";
    Trait["RiskNeutral"] = "RiskNeutral";
    Trait["RiskTolerant"] = "RiskTolerant";
    // Time Horizon
    Trait["ShortTerm"] = "ShortTerm";
    Trait["MediumTerm"] = "MediumTerm";
    Trait["LongTerm"] = "LongTerm";
    // Strategy Orientation
    Trait["YieldMaximizer"] = "YieldMaximizer";
    Trait["CapitalPreserver"] = "CapitalPreserver";
    Trait["BalancedGrowth"] = "BalancedGrowth";
    Trait["IncomeSeeker"] = "IncomeSeeker";
    // Asset Preferences
    Trait["StableOnly"] = "StableOnly";
    Trait["BlueChipOnly"] = "BlueChipOnly";
    Trait["VolatileAssetExposure"] = "VolatileAssetExposure";
    Trait["MultiAsset"] = "MultiAsset";
    Trait["ETHOnly"] = "ETHOnly";
    Trait["BTCOnly"] = "BTCOnly";
    // Reward Preferences
    Trait["AutoCompounder"] = "AutoCompounder";
    Trait["RewardClaimer"] = "RewardClaimer";
    Trait["Reinvestor"] = "Reinvestor";
    // Platform Preferences
    Trait["DecentralizedOnly"] = "DecentralizedOnly";
    Trait["TrustedProtocolsOnly"] = "TrustedProtocolsOnly";
    Trait["ExperimentalProtocolsAllowed"] = "ExperimentalProtocolsAllowed";
    // Fee Sensitivity
    Trait["LowFeeOnly"] = "LowFeeOnly";
    Trait["HighToleranceForFees"] = "HighToleranceForFees";
    // Automation Level
    Trait["FullyAutomated"] = "FullyAutomated";
    Trait["SemiAutomated"] = "SemiAutomated";
    Trait["ManualOverridesAllowed"] = "ManualOverridesAllowed";
    // Environmental or Ethical Preferences (if applicable)
    Trait["ESGCompliant"] = "ESGCompliant";
    Trait["GreenProjectsOnly"] = "GreenProjectsOnly";
    // Behavioral/Personality Traits
    Trait["Opportunistic"] = "Opportunistic";
    Trait["Conservative"] = "Conservative";
    Trait["Aggressive"] = "Aggressive";
    Trait["Adaptive"] = "Adaptive";
})(Trait || (exports.Trait = Trait = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Others";
})(Gender || (exports.Gender = Gender = {}));
