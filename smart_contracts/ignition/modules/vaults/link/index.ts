// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import NovaModule from "../../agents/Nova";
import AddressesProviderModule from "../../AddressesProvider";
import UniswapMockModule from "../../swap_routers/UniswapMock";

const VaultLINKModule = buildModule("VaultLINKModule", (m) => {
  // == Vault == //
  const vaultLink = m.contract("SimpleVault");

  const { nova } = m.useModule(NovaModule);

  const name = m.getParameter("name", "AfterYield Link LP");
  const symbol = m.getParameter("name", "ALP");
  const allowedAsset = m.getParameter(
    "allowedAsset",
    "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26"
  );

  m.call(vaultLink, "initialize", [name, symbol, allowedAsset, nova]);

  // == Strategies == //
  const aaveStrategyLink = m.contract("AaveSupplyOnlyStrategy");

  const poolAddressesProvider = m.getParameter(
    "poolAddressesProvider",
    "0xfb87056c0587923f15EB0aABc7d0572450Cc8003"
  );
  const WETH = m.getParameter(
    "_WETH",
    "0xf97b6c636167b529b6f1d729bd9bc0e2bd491848"
  );
  const aToken = m.getParameter(
    "aToken",
    "0x6cC4457C7547E6995ba7bA000851182F94658A51"
  );
  const harvestOnDeposit = m.getParameter("harvestOnDeposit", true);
  const asset = m.getParameter(
    "asset",
    "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26"
  );
  const rewardTokens = m.getParameter("rewardTokens", []);

  const { uniswapRouter } = m.useModule(UniswapMockModule);
  const { feeCollector } = m.useModule(AddressesProviderModule);

  const config = {
    vault: vaultLink,
    manager: m.getAccount(0),
    swapRouter: uniswapRouter,
    strategist: m.getAccount(0),
    feeRecipient: m.getAccount(0),
    feeCollector: feeCollector,
  };

  m.call(aaveStrategyLink, "initialize", [
    poolAddressesProvider,
    WETH,
    aToken,
    harvestOnDeposit,
    asset,
    rewardTokens,
    config,
  ]);
  return { vaultLink, aaveStrategyLink };
});

export default VaultLINKModule;
