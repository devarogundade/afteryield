// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";
import AddressesProviderModule from "../AddressesProvider";
import AfterYieldTokenModule from "../AfterYieldToken";

const AtlasModule = buildModule("AtlasModule", (m) => {
  const { afterYieldToken: feeToken } = m.useModule(AfterYieldTokenModule);
  const { addressesProvider } = m.useModule(AddressesProviderModule);

  const feePerTask = m.getParameter("feePerTask", parseEther("0.0001"));
  const feeCollector = m.getParameter("feeCollector", m.getAccount(0));

  const atlas = m.contract("Agent", [
    feePerTask,
    feeCollector,
    feeToken,
    addressesProvider,
  ]);

  return { atlas };
});

export default AtlasModule;
