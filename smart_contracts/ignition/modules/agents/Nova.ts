// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";
import AddressesProviderModule from "../AddressesProvider";
import AfterYieldTokenModule from "../AfterYieldToken";

const NovaModule = buildModule("NovaModule", (m) => {
  const { afterYieldToken } = m.useModule(AfterYieldTokenModule);
  const { addressesProvider } = m.useModule(AddressesProviderModule);

  const feePerTask = m.getParameter("feePerTask", parseEther("0.0001"));
  const feeCollector = m.getParameter("feeCollector", m.getAccount(0));

  const nova = m.contract("Agent", [
    feePerTask,
    feeCollector,
    afterYieldToken, // feeToken
    addressesProvider,
  ]);

  return { nova };
});

export default NovaModule;
