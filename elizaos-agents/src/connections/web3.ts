import { createPublicClient, createWalletClient, http } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { avalancheFuji } from "viem/chains";

const publicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(),
});

const walletClient = createWalletClient({
  account: mnemonicToAccount(process.env.MNEMONIC!),
  chain: avalancheFuji,
  transport: http(),
});

export { publicClient, walletClient };
