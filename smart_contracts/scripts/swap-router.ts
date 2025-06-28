import { avalancheFuji } from "viem/chains";
import {
  createWalletClient,
  createPublicClient,
  http,
  Hex,
  parseEther,
  parseUnits,
} from "viem";
import { mnemonicToAccount } from "viem/accounts";
import dotenv from "dotenv";
import Factory from "@uniswap/v2-core/build/UniswapV2Factory.json";
import Router from "@uniswap/v2-periphery/build/UniswapV2Router02.json";
import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";

dotenv.config();

const GasLimit = BigInt(10_000_000);

const publicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(avalancheFuji.rpcUrls.default.http[0]),
});

const walletClient = createWalletClient({
  chain: avalancheFuji,
  transport: http(avalancheFuji.rpcUrls.default.http[0]),
  account: mnemonicToAccount(
    "enhance patch crime hundred damp invite hamster pill breeze crawl drama cheap"
  ),
});

async function deployContract(abi: any, bytecode: Hex, args: any[] = []) {
  const hash = await walletClient.deployContract({
    abi,
    bytecode,
    args,
    gas: GasLimit,
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log(`Contract deployed at: ${receipt.contractAddress}`);
  return receipt.contractAddress;
}

async function deployFactory() {
  return deployContract(Factory.abi, Factory.bytecode as Hex, [
    walletClient.account.address,
  ]);
}

async function deployRouter(factory: string, weth: string) {
  return deployContract(Router.abi, Router.bytecode as Hex, [factory, weth]);
}

async function approve(token: Hex, spender: Hex, amount: bigint) {
  const hash = await walletClient.writeContract({
    address: token,
    abi: ERC20.abi,
    functionName: "approve",
    args: [spender, amount],
  });
  await publicClient.waitForTransactionReceipt({ hash });
  console.log(`Approved ${amount} for ${spender}`);
}

async function addLiquidity(
  router: Hex,
  tokenA: Hex,
  tokenB: Hex,
  amountADesired: bigint,
  amountBDesired: bigint
) {
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 200000);

  await approve(tokenA, router, amountADesired);
  await approve(tokenB, router, amountBDesired);

  const hash = await walletClient.writeContract({
    address: router,
    abi: Router.abi,
    functionName: "addLiquidity",
    args: [
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      0n,
      0n,
      walletClient.account.address,
      deadline,
    ],
  });
  await publicClient.waitForTransactionReceipt({ hash });
  console.log(`Liquidity added for ${tokenA} and ${tokenB}`);
}

async function addLiquidityETH(
  router: Hex,
  tokenB: Hex,
  amountADesired: bigint,
  amountBDesired: bigint
) {
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 200000);

  await approve(tokenB, router, amountBDesired);

  const hash = await walletClient.writeContract({
    address: router,
    abi: Router.abi,
    functionName: "addLiquidityETH",
    args: [
      tokenB,
      amountBDesired,
      0n,
      0n,
      walletClient.account.address,
      deadline,
    ],
    value: amountADesired,
  });
  await publicClient.waitForTransactionReceipt({ hash });
  console.log(`Liquidity added for ETH and ${tokenB}`);
}

const WETH = "0xf97b6c636167b529b6f1d729bd9bc0e2bd491848";
const WBTC = "0x0efd8ad2231c0b9c4d63f892e0a0a59a626ce88d";
const LINK = "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26";
const USDC = "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf";
const DAI = "0x676bd5b5d0955925aece653c50426940c58036c8";

async function main() {
  const factory = await deployFactory();
  if (!factory) return;

  const router = await deployRouter(factory, WETH);
  if (!router) return;

  // await addLiquidityETH(router, WBTC, parseEther("0.01"), parseUnits("0.1", 8));
  await addLiquidity(router, WETH, WBTC, parseEther("1"), parseUnits("0.1", 8));

  // await addLiquidityETH(router, LINK, parseEther("0.01"), parseEther("200"));
  await addLiquidity(router, WETH, LINK, parseEther("1"), parseEther("200"));

  // await addLiquidityETH(
  //   router,
  //   USDC,
  //   parseEther("0.01"),
  //   parseUnits("2000", 6)
  // );
  await addLiquidity(
    router,
    WETH,
    USDC,
    parseEther("1"),
    parseUnits("2000", 6)
  );

  // await addLiquidityETH(router, DAI, parseEther("0.01"), parseEther("2000"));
  await addLiquidity(router, WETH, DAI, parseEther("1"), parseEther("2000"));

  await addLiquidity(
    router,
    WBTC,
    LINK,
    parseUnits("0.1", 8),
    parseEther("200")
  );

  await addLiquidity(
    router,
    WBTC,
    USDC,
    parseUnits("0.1", 8),
    parseUnits("2000", 6)
  );

  await addLiquidity(
    router,
    WBTC,
    DAI,
    parseUnits("0.1", 8),
    parseEther("2000")
  );

  await addLiquidity(
    router,
    USDC,
    LINK,
    parseUnits("2000", 6),
    parseEther("200")
  );

  await addLiquidity(router, DAI, LINK, parseEther("2000"), parseEther("200"));

  await addLiquidity(
    router,
    USDC,
    DAI,
    parseUnits("2000", 6),
    parseEther("2000")
  );

  console.log(`Factory: ${factory}`);
  console.log(`Router: ${router}`);
}

main().catch(console.error);

// Factory: 0x8e659da3e81fddbd73c1511c990391f9486cf16c;
// Router: 0xabdf1354cf30f8fbf23f86d3dfa3e149de254541;
