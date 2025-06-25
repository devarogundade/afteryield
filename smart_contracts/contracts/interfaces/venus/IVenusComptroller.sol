// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IVenusComptroller {
    function getRewardDistributors() external view returns (address[] memory);
    function enterMarkets(address[] memory _iTokens) external;
}
