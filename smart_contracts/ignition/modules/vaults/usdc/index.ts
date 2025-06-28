// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AtlasModule from "../../agents/Atlas";
import AddressesProviderModule from "../../AddressesProvider";
import UniswapMockModule from "../../swap_routers/UniswapMock";

const VaultUSDCModule = buildModule("VaultUSDCModule", (m) => {
  // == Vault == //
  const vaultUSDC = m.contract("SimpleVault");

  const { atlas } = m.useModule(AtlasModule);

  const name = m.getParameter("name", "AfterYield USDC LP");
  const symbol = m.getParameter("name", "ALP");
  const allowedAsset = m.getParameter(
    "allowedAsset",
    "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf"
  );

  m.call(vaultUSDC, "initialize", [name, symbol, allowedAsset, atlas]);

  // == Strategies == //
  const aaveStrategyUSDC = m.contract("AaveSupplyOnlyStrategy");

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
    "0xb1c85310a1b809C70fA6806d27Da425C1261F801"
  );
  const harvestOnDeposit = m.getParameter("harvestOnDeposit", true);
  const asset = m.getParameter(
    "asset",
    "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf"
  );
  const rewardTokens = m.getParameter("rewardTokens", []);

  const { uniswapRouter } = m.useModule(UniswapMockModule);
  const { feeCollector } = m.useModule(AddressesProviderModule);

  const config = {
    vault: vaultUSDC,
    manager: m.getAccount(0),
    swapRouter: uniswapRouter,
    strategist: m.getAccount(0),
    feeRecipient: m.getAccount(0),
    feeCollector: feeCollector,
  };

  m.call(aaveStrategyUSDC, "initialize", [
    poolAddressesProvider,
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
