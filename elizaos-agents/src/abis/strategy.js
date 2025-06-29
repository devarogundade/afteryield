"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyABI = void 0;
exports.strategyABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "callFeeAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "feeAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "strategistFeeAmount",
                type: "uint256",
            },
        ],
        name: "ChargedFees",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "amountScaled",
                type: "uint256",
            },
        ],
        name: "Deposit",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "feeCollector",
                type: "address",
            },
        ],
        name: "FeeCollectorSetted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "feeRecipient",
                type: "address",
            },
        ],
        name: "FeeRecipientSetted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "manager",
                type: "address",
            },
        ],
        name: "ManagerSetted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "manager",
                type: "address",
            },
        ],
        name: "StrategistSetted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "feeId",
                type: "uint256",
            },
        ],
        name: "StrategyFeeIdSetted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "harvester",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assetHarvested",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tvl",
                type: "uint256",
            },
        ],
        name: "StrategyHarvest",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "router",
                type: "address",
            },
        ],
        name: "SwapRouterSetted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "vault",
                type: "address",
            },
        ],
        name: "VaultSetted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "amountScaled",
                type: "uint256",
            },
        ],
        name: "Withdraw",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "fee",
                type: "uint256",
            },
        ],
        name: "WithdrawalFeeSetted",
        type: "event",
    },
    {
        inputs: [],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "exitStrategy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAsset",
        outputs: [
            {
                internalType: "address",
                name: "asset",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getBalanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "balanceOf",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getBalanceOfAsset",
        outputs: [
            {
                internalType: "uint256",
                name: "balanceOfAsset",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getBalanceOfPool",
        outputs: [
            {
                internalType: "uint256",
                name: "balanceOfPool",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getBaseRate",
        outputs: [
            {
                internalType: "uint256",
                name: "baseRate",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getDepositFee",
        outputs: [
            {
                internalType: "uint256",
                name: "depositFee",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getLastHarvest",
        outputs: [
            {
                internalType: "uint256",
                name: "lastHarvest",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getStrategyFeeId",
        outputs: [
            {
                internalType: "uint256",
                name: "strategyFeeId",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getVault",
        outputs: [
            {
                internalType: "address",
                name: "vault",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getWithdrawFee",
        outputs: [
            {
                internalType: "uint256",
                name: "withdrawFee",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "harvest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "callFeeRecipient",
                type: "address",
            },
        ],
        name: "harvestWithCallFeeRecipient",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "managerHarvest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "panic",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "resetRewards",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IFeeCollector",
                name: "newFeeCollector",
                type: "address",
            },
        ],
        name: "setFeeCollector",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newFeeRecipient",
                type: "address",
            },
        ],
        name: "setFeeRecipient",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "newHarvestOnDeposit",
                type: "bool",
            },
        ],
        name: "setHarvestOnDeposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newManager",
                type: "address",
            },
        ],
        name: "setManager",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newReward",
                type: "address",
            },
        ],
        name: "setReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newRewarder",
                type: "address",
            },
        ],
        name: "setRewarder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newStrategist",
                type: "address",
            },
        ],
        name: "setStrategist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newFeeId",
                type: "uint256",
            },
        ],
        name: "setStrategyFeeId",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newRouter",
                type: "address",
            },
        ],
        name: "setSwapRouter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newVault",
                type: "address",
            },
        ],
        name: "setVault",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newFee",
                type: "uint256",
            },
        ],
        name: "setWithdrawalFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "swapRouter",
        outputs: [
            {
                internalType: "address",
                name: "router",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountScaled",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [
            {
                internalType: "uint256",
                name: "withdrawn",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
