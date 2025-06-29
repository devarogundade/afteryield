import type { Token } from "./types";
import type { Hex } from "viem";

const Provider = {
  ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as Hex,
  AccountFactory: "0xa319d230048aAE3c681d7898d71800d92605C80e" as Hex,
};

const getTokens: Token[] = [
  {
    name: "Wrapped ETH",
    address: "0xf97b6c636167b529b6f1d729bd9bc0e2bd491848",
    symbol: "WETH",
    icon: "/images/weth.png",
    decimals: 18,
    price: 2436.49, // latest ETH price
  },
  {
    name: "USDC",
    address: "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
    symbol: "USDC",
    icon: "/images/usdc.png",
    decimals: 6,
    price: 0.9999, // stable ~1 USD :contentReference[oaicite:8]{index=8}
  },
  {
    name: "Bitcoin",
    address: "0x0efd8ad2231c0b9c4d63f892e0a0a59a626ce88d",
    symbol: "WBTC",
    icon: "/images/btc.png",
    decimals: 8,
    price: 107491.0, // wrapped BTC price
  },
  {
    name: "AfterYieldToken",
    address: "0x5375066508afe47c519CBBe7fcc856a0d5D5254A",
    symbol: "AYT",
    icon: "/images/logo.png",
    decimals: 18,
    price: 1,
  },
  {
    name: "Avalanche",
    address: Provider.ETH,
    symbol: "AVAX",
    icon: "/images/avax.png",
    decimals: 18,
    price: 17.91, // AVAX price
  },
  {
    name: "DAI",
    address: "0x676bd5b5d0955925aece653c50426940c58036c8",
    symbol: "DAI",
    icon: "/images/dai.png",
    decimals: 18,
    price: 0.99989, // DAI nearly $1
  },
  {
    name: "Chainlink",
    address: "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26",
    symbol: "LINK",
    icon: "/images/link.png",
    decimals: 18,
    price: 13.35, // recent LINK price :contentReference[oaicite:9]{index=9}
  },
];

const getToken = (address: Hex | undefined): Token | undefined => {
  return getTokens.find((t) => t.address == address);
};
export { Provider, getTokens, getToken };
