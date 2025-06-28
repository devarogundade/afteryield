// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IBaseStrategy} from "./IBaseStrategy.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IStrategy is IBaseStrategy {
    function deposit() external;

    function withdraw(
        uint256 amountScaled
    ) external returns (uint256 withdrawn);

    function harvest() external;

    function harvestWithCallFeeRecipient(address callFeeRecipient) external;

    function managerHarvest() external;

    function setHarvestOnDeposit(bool newHarvestOnDeposit) external;

    function exitStrategy() external;

    function panic() external;

    function setReward(address newReward) external;

    function resetRewards() external;

    function setRewarder(address newRewarder) external;

    function getLastHarvest() external view returns (uint256 lastHarvest);

    function getAsset() external view returns (address asset);

    function getBalanceOf() external view returns (uint256 balanceOf);

    function getBalanceOfAsset() external view returns (uint256 balanceOfAsset);

    function getBalanceOfPool() external view returns (uint256 balanceOfPool);

    function getBaseRate() external view returns (uint256 baseRate);
}
