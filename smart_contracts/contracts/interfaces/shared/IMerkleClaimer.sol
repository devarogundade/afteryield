// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IMerkleClaimer {
    function claim(
        address[] calldata users,
        address[] calldata tokens,
        uint256[] calldata amounts,
        bytes32[][] calldata proofs
    ) external;
}
