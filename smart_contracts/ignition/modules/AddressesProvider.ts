// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AddressesProviderModule = buildModule("AddressesProviderModule", (m) => {
  const addressesProvider = m.contract("AddressesProvider");

  const afterYieldFunctions = m.contract("AfterYieldFunctions");
  const afterYieldOracle = m.contract("AfterYieldOracle");
  const accountFactory = m.contract("AccountFactory");
  const feeCollector = m.contract("FeeCollector");

  // m.call(afterYieldOracle, "setFeed", ["", ""]);

  m.call(addressesProvider, "setAfterYieldFunctions", [afterYieldFunctions]);
  m.call(addressesProvider, "setAfterYieldOracle", [afterYieldOracle]);
  m.call(addressesProvider, "setAccountFactory", [accountFactory]);
  m.call(addressesProvider, "setFeeCollector", [feeCollector]);

  return { addressesProvider };
});

export default AddressesProviderModule;
