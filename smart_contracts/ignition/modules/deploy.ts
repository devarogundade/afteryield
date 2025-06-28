// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import VaultUSDCModule from "./vaults/usdc";
import VaultLINKModule from "./vaults/link";

const DeployModule = buildModule("DeployModule", (m) => {
  const { vaultUSDC } = m.useModule(VaultUSDCModule);
  const { vaultLink } = m.useModule(VaultLINKModule);

  return {
    vaultLink,
    vaultUSDC,
  };
});

export default DeployModule;
