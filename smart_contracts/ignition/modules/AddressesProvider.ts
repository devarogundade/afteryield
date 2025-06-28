// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AddressesProviderModule = buildModule("AddressesProviderModule", (m) => {
  const addressesProvider = m.contract("AddressesProvider");

  const afterYieldFunctions = m.contract("AfterYieldFunctions", [
    "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0",
    "0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000",
    `
    return "Hello";
    `,
  ]);
  const afterYieldOracle = m.contract("AfterYieldOracle");
  const accountFactory = m.contract("AccountFactory");
  const feeCollector = m.contract("FeeCollector");

  m.call(
    afterYieldOracle,
    "setFeed",
    [
      "0xf97b6c636167b529b6f1d729bd9bc0e2bd491848",
      "0x86d67c3D38D2bCeE722E601025C25a575021c6EA",
    ],
    { id: "WETH" }
  );
  m.call(
    afterYieldOracle,
    "setFeed",
    [
      "0x0efd8ad2231c0b9c4d63f892e0a0a59a626ce88d",
      "0x31CF013A08c6Ac228C94551d535d5BAfE19c602a",
    ],
    { id: "WBTC" }
  );
  m.call(
    afterYieldOracle,
    "setFeed",
    [
      "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26",
      "0x34C4c526902d88a3Aa98DB8a9b802603EB1E3470",
    ],
    { id: "LINK" }
  );
  m.call(
    afterYieldOracle,
    "setFeed",
    [
      "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf",
      "0x97FE42a7E96640D932bbc0e1580c73E705A8EB73",
    ],
    { id: "USDC" }
  );
  m.call(
    afterYieldOracle,
    "setFeed",
    [
      "0x676bd5b5d0955925aece653c50426940c58036c8",
      "0x7898AcCC83587C3C55116c5230C17a6Cd9C71bad",
    ],
    { id: "DAI" }
  );

  m.call(addressesProvider, "setAfterYieldFunctions", [afterYieldFunctions]);
  m.call(addressesProvider, "setAfterYieldOracle", [afterYieldOracle]);
  m.call(addressesProvider, "setAccountFactory", [accountFactory]);
  m.call(addressesProvider, "setFeeCollector", [feeCollector]);

  return { addressesProvider, feeCollector };
});

export default AddressesProviderModule;
