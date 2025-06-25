// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IBaseStrategy} from "./IBaseStrategy.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IStrategy is IBaseStrategy {
    event StrategyHarvest(
        address harvester,
        uint256 assetHarvested,
        uint256 tvl
    );
    event ChargedFees(
        uint256 callFeeAmount,
        uint256 feeAmount,
        uint256 strategistFeeAmount
    );
    event Withdraw(uint256 balance);
    event Deposit(uint256 balance);

    struct Upgrade {
        address implementation;
        uint256 proposedTime;
    }

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

    function getAsset() external view returns (address asset);

    function getBalanceOf() external view returns (uint256 balanceOf);

    function getBalanceOfAsset() external view returns (uint256 balanceOfAsset);

    function getBalanceOfPool() external view returns (uint256 balanceOfPool);
}
