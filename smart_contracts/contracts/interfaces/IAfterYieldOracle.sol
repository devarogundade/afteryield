// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IAfterYieldOracle {
    event TokenFeedSetted(address indexed token, address feed);

    function setFeed(address token, address feed) external;

    function getPrice(
        address token
    ) external view returns (int256 answer, uint80 decimals);
}
