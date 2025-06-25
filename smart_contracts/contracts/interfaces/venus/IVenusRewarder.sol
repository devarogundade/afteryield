// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IVenusRewarder {
    function rewardToken() external view returns (address);
    function claimRewardToken(
        address holder,
        address[] memory iTokens
    ) external;
}
