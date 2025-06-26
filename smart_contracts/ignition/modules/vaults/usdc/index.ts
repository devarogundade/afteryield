// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AtlasModule from "../../agents/Atlas";
import AddressesProviderModule from "../../AddressesProvider";

const VaultUSDCModule = buildModule("VaultUSDCModule", (m) => {
  // == Vault == //
  const vaultUSDC = m.contract("SimpleVault");

  const { atlas } = m.useModule(AtlasModule);

  const name = m.getParameter("name", "AfterYield USDC LP");
  const symbol = m.getParameter("name", "ALP");
  const allowedAsset = m.getParameter("allowedAsset", "");

  m.call(vaultUSDC, "initialize", [name, symbol, allowedAsset, atlas]);

  // == Strategies == //
  const aaveStrategyUSDC = m.contract("AaveSupplyOnlyStrategy");

  const WETH = m.getParameter("_WETH", "");
  const aToken = m.getParameter("aToken", "");
  const harvestOnDeposit = m.getParameter("harvestOnDeposit", true);
  const asset = m.getParameter("asset", "");
  const rewardTokens = m.getParameter("rewardTokens", [""]);

  const { feeCollector } = m.useModule(AddressesProviderModule);

  const config = {
    vault: vaultUSDC,
    manager: m.getAccount(0),
    swapRouter: "",
    strategist: m.getAccount(0),
    feeRecipient: m.getAccount(0),
    feeCollector: feeCollector,
  };

  m.call(aaveStrategyUSDC, "initialize", [
    WETH,
    aToken,
    harvestOnDeposit,
    asset,
    rewardTokens,
    config,
  ]);
  return { vaultUSDC, aaveStrategyUSDC };
});

export default VaultUSDCModule;
