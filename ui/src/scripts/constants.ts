import type { Token } from "./types";
import type { Hex } from "viem";

const Provider = {
  ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as Hex,
  AccountFactory: "0x77b2ea012282940951b150E634a63e16C94BDbDA" as Hex,
};

const getTokens: Token[] = [
  {
    name: "Wrapped ETH",
    address: "0xf97b6c636167b529b6f1d729bd9bc0e2bd491848",
    symbol: "WETH",
    icon: "/images/weth.png",
    decimals: 18,
  },
  {
    name: "USDC",
    symbol: "USDC",
    address: "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
    icon: "/images/usdc.png",
    decimals: 6,
  },
  {
    name: "Bitcoin",
    symbol: "WBTC",
    address: "0x0efd8ad2231c0b9c4d63f892e0a0a59a626ce88d",
    icon: "/images/btc.png",
    decimals: 8,
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    address: Provider.ETH,
    icon: "/images/avax.png",
    decimals: 18,
  },
  {
    name: "DAI",
    symbol: "DAI",
    address: "0x676bd5b5d0955925aece653c50426940c58036c8",
    icon: "/images/dai.png",
    decimals: 18,
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    address: "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26",
    icon: "/images/link.png",
    decimals: 18,
  },
];

const getToken = (address: Hex | undefined): Token | undefined => {
  return getTokens.find((t) => t.address == address);
};
export { Provider, getTokens, getToken };
