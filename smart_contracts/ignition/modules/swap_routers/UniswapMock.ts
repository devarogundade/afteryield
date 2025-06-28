// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UniswapMockModule = buildModule("UniswapMockModule", (m) => {
  const swapRouter = m.getParameter(
    "swapRouter",
    "0xabdf1354cf30f8fbf23f86d3dfa3e149de254541"
  );

  const uniswapRouter = m.contract("UniswapRouter", [swapRouter]);

  return { uniswapRouter };
});

export default UniswapMockModule;
