import { VaultInfo } from "src/types";
import { UNISWAP_ETH_USDC_STRATEGY } from "./strategy";

const VAULTS: VaultInfo[] = [
  {
    address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
    agentAddress: "0x1111",
    name: "Uniswap ETH-USDC",
    image: "",
    asset: {
      name: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
      address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
      symbol: "USDC",
      icon: "https://afteryield.com/images/usdc.png",
      decimals: 6,
    },
    allSupportedStrategies: [UNISWAP_ETH_USDC_STRATEGY],
  },
];

export { VAULTS };
