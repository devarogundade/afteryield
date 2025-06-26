// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const AfterYieldTokenModule = buildModule("AfterYieldTokenModule", (m) => {
  const afterYieldToken = m.contract("AfterYieldToken");

  m.call(afterYieldToken, "addToSupply", [parseEther("10000")]);

  return { afterYieldToken };
});

export default AfterYieldTokenModule;
