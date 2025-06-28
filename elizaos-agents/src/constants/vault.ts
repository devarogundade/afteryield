import { VaultInfo } from "../types";
import { AAVE_USDC_STRATEGY, AAVE_LINK_STRATEGY } from "./strategy";

const VAULTS: VaultInfo[] = [
  {
    address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    agentAddress: "0x1111",
    name: "USDC",
    image: "/images/usdc.png",
    asset: {
      name: "USDC",
      address: "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
      symbol: "USDC",
      icon: "/images/usdc.png",
      decimals: 6,
    },
    allSupportedStrategies: [AAVE_USDC_STRATEGY],
  },
  {
    address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    agentAddress: "0x1111",
    name: "Chainlink",
    image: "/images/chainlink.png",
    asset: {
      name: "LINK",
      address: "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
      symbol: "LINK",
      icon: "/images/link.png",
      decimals: 18,
    },
    allSupportedStrategies: [AAVE_LINK_STRATEGY],
  },
];

export { VAULTS };
