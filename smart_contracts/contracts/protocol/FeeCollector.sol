// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IFeeCollector} from "../interfaces/IFeeCollector.sol";

contract FeeCollector is IFeeCollector {
    function setStrategyFeeId(uint256 feeId) external {}

    function getFees(
        address strategy
    ) external view returns (FeeCategory memory) {}

    function strategyFeeId(address strategy) external view returns (uint256) {}
}
