import { encodeAbiParameters } from "viem";
// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import VaultUSDCModule from "./vaults/usdc";
import VaultLINKModule from "./vaults/link";
import AtlasModule from "./agents/Atlas";
import NovaModule from "./agents/Nova";
import LyraModule from "./agents/Lyra";
import EchoModule from "./agents/Echo";
import OrionModule from "./agents/Orion";

const DeployModule = buildModule("DeployModule", (m) => {
  const { vaultUSDC, aaveStrategyUSDC } = m.useModule(VaultUSDCModule);
  const { vaultLink, aaveStrategyLink } = m.useModule(VaultLINKModule);

  const { atlas } = m.useModule(AtlasModule);
  const { nova } = m.useModule(NovaModule);
  const { lyra } = m.useModule(LyraModule);
  const { echo } = m.useModule(EchoModule);
  const { orion } = m.useModule(OrionModule);

  // m.call(atlas, "addStrategy", [
  //   encodeAbiParameters(
  //     [
  //       { type: "address", name: "vault" },
  //       { type: "address", name: "newStrategy" },
  //     ],
  //     [vaultUSDC, aaveStrategyUSDC]
  //   ),
  // ]);

  // m.call(nova, "addStrategy", [
  //   encodeAbiParameters(
  //     [
  //       { type: "address", name: "vault" },
  //       { type: "address", name: "newStrategy" },
  //     ],
  //     [vaultLink, aaveStrategyLink]
  //   ),
  // ]);

  return {};
});

export default DeployModule;
