// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IIncentivesController {
    function claimRewards(
        address[] calldata assets,
        uint256 amount,
        address to
    ) external returns (uint256);

    function getRewardsBalance(
        address[] calldata assets,
        address user
    ) external view returns (uint256);
}
