// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

library Consts {
    address public constant ETH =
        address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

    uint256 public constant DIVISOR = 1e18;

    uint256 public constant WITHDRAWAL_FEE_CAP = 50;
    uint256 public constant WITHDRAWAL_MAX = 10_000;

    uint256 public constant STRATEGY_ALLOCATION_MAX = 10_000;
}
