import dotenv from "dotenv";
dotenv.config();

import {
  createPublicClient,
  createWalletClient,
  http,
  type WalletClient,
} from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { avalancheFuji } from "viem/chains";

const publicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(),
});

const walletClient: WalletClient = createWalletClient({
  account: mnemonicToAccount(process.env.MNEMONIC!),
  chain: avalancheFuji,
  transport: http(),
});

export { publicClient, walletClient };
