import { createPublicClient, createWalletClient, http } from "viem";
import { avalancheFuji } from "viem/chains";

const publicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(),
});

const walletClient = createWalletClient({
  account: "0x",
  chain: avalancheFuji,
  transport: http(),
});

export { publicClient, walletClient };
