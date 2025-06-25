// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IAaveV3Incentives {
    function claimRewards(
        address[] calldata assets,
        uint256 amount,
        address to,
        address reward
    ) external returns (uint256);

    function claimAllRewards(
        address[] calldata assets,
        address to
    ) external returns (uint256);

    function getUserRewards(
        address[] calldata assets,
        address user,
        address reward
    ) external view returns (uint256);
}
