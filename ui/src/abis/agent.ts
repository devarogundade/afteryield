export const agentABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "feePerTask",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "feeCollector",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "feeToken",
        type: "address",
      },
      {
        internalType: "contract IAddressesProvider",
        name: "provider",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum Enums.ApprovalFlag",
        name: "flag",
        type: "uint8",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "hasFunds",
        type: "bool",
      },
    ],
    name: "BeforeTask",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
    ],
    name: "addStrategy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAccount",
        name: "account",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "enum Enums.ApprovalFlag",
        name: "flag",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Enums.ApprovalFlag",
        name: "flag",
        type: "uint8",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAccount",
        name: "account",
        type: "address",
      },
      {
        internalType: "enum Enums.ApprovalFlag",
        name: "flag",
        type: "uint8",
      },
    ],
    name: "checkApproval",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountScaled",
        type: "uint256",
      },
      {
        internalType: "contract IAccount",
        name: "account",
        type: "address",
      },
    ],
    name: "depositFromAccount",
    outputs: [
      {
        internalType: "uint256",
        name: "lpMinted",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeeToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "feeToken",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
    ],
    name: "reallocation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
    ],
    name: "removeStrategy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Enums.TaskType",
        name: "taskType",
        type: "uint8",
      },
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "gasLimit",
        type: "uint32",
      },
    ],
    name: "upKeep",
    outputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "contract IAccount",
        name: "account",
        type: "address",
      },
    ],
    name: "withdrawAllToAccount",
    outputs: [
      {
        internalType: "uint256",
        name: "amountScaled",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lpAmount",
        type: "uint256",
      },
      {
        internalType: "contract IAccount",
        name: "account",
        type: "address",
      },
    ],
    name: "withdrawToAccount",
    outputs: [
      {
        internalType: "uint256",
        name: "amountScaled",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
