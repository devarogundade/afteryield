import { VaultInfo } from "../types";
import { AAVE_USDC_STRATEGY, AAVE_LINK_STRATEGY } from "./strategy";

const VAULTS: VaultInfo[] = [
  {
    address: "0x975B445de301719d750064D9146B248EfB251373",
    agentAddress: "0x1AD7e3fB819297179e3650b331A7346394470346",
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
    address: "0x295B515831E34B1198Ffe5562A7d868BBAaf467e",
    agentAddress: "0x8853006912503D97657428207A6eFF42c63CCB49",
    name: "Chainlink",
    image: "/images/chainlink.png",
    asset: {
      name: "LINK",
      address: "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26",
      symbol: "LINK",
      icon: "/images/link.png",
      decimals: 18,
    },
    allSupportedStrategies: [AAVE_LINK_STRATEGY],
  },
];

export { VAULTS };
