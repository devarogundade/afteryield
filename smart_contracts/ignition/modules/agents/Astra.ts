// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";
import AddressesProviderModule from "../AddressesProvider";

const AstraModule = buildModule("AstraModule", (m) => {
  const feePerTask = m.getParameter("feePerTask", parseEther("0.0001"));
  const feeCollector = m.getParameter("feeCollector", m.getAccount(0));
  const feeToken = m.getParameter("feeToken", "");

  const { addressesProvider } = m.useModule(AddressesProviderModule);

  const astra = m.contract("Agent", [
    feePerTask,
    feeCollector,
    feeToken,
    addressesProvider,
  ]);

  return { astra };
});

export default AstraModule;
