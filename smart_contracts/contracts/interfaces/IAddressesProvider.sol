// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IAddressesProvider {
    function getAfterYieldOracle()
        external
        view
        returns (address afterYieldFunctions);

    function getAfterYieldFunctions()
        external
        view
        returns (address afterYieldOracle);

    function getAccountFactory() external view returns (address accountFactory);

    function getFeeCollector() external view returns (address feeCollector);
}
