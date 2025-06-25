// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IFeeCollector {
    struct FeeCategory {
        uint256 total;
        uint256 protocol;
        uint256 call;
        uint256 strategist;
        string label;
        bool active;
    }

    struct AllFees {
        FeeCategory performance;
        uint256 deposit;
        uint256 withdraw;
    }

    function setStrategyFeeId(uint256 feeId) external;

    function getFees(
        address strategy
    ) external view returns (FeeCategory memory);

    function strategyFeeId(address strategy) external view returns (uint256);
}
