// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface ISwapRouter {
    function swap(address tokenIn, address tokenOut, uint256 amountIn) external;
}
