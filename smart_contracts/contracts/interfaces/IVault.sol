// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IAccount} from "./IAccount.sol";
import {IStrategy} from "./IStrategy.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IVault is IERC20 {
    function deposit(uint256 amountScaled) external returns (uint256 lpMinted);

    function withdraw(uint256 lpAmount) external returns (uint256 amountScaled);

    function withdrawAll() external returns (uint256 amountScaled);

    function depositFromAccount(
        uint256 amountScaled,
        IAccount account
    ) external returns (uint256 lpMinted);

    function withdrawToAccount(
        uint256 lpAmount,
        IAccount account
    ) external returns (uint256 amountScaled);

    function withdrawAllToAccount(
        IAccount account
    ) external returns (uint256 amountScaled);

    function addStrategy(IStrategy newStrategy) external;

    function removeStrategy(IStrategy strategyToRemove) external;

    function reallocate(uint256[] memory allocations) external;

    function getAsset() external view returns (address asset);

    function getShares(
        uint256 lpAmount
    ) external view returns (uint256 amountScaled);

    function getBalance() external view returns (uint256 amountScaled);

    function getAvailable() external view returns (uint256 available);

    function getAllocation(
        IStrategy strategy
    ) external view returns (uint256 allocation);

    function getSummary()
        external
        view
        returns (uint256 allocated, uint256 idle);

    function getStrategies()
        external
        view
        returns (IStrategy[] memory strategies);
}
