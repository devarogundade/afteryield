// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IAddressesProvider} from "../interfaces/IAddressesProvider.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract AddressesProvider is IAddressesProvider, Ownable {
    address internal _afterYieldFunctions;
    address internal _afterYieldOracle;
    address internal _accountFactory;
    address internal _feeCollector;

    constructor() Ownable(_msgSender()) {}

    function setAfterYieldFunctions(
        address newAfterYieldFunctions
    ) external onlyOwner {
        _afterYieldFunctions = newAfterYieldFunctions;
    }

    function setAfterYieldOracle(
        address newAfterYieldOracle
    ) external onlyOwner {
        _afterYieldOracle = newAfterYieldOracle;
    }

    function setAccountFactory(address newAccountFactory) external onlyOwner {
        _accountFactory = newAccountFactory;
    }

    function setFeeCollector(address newFeeCollector) external onlyOwner {
        _feeCollector = newFeeCollector;
    }

    function getAfterYieldFunctions()
        external
        view
        returns (address afterYieldOracle)
    {
        afterYieldOracle = _afterYieldOracle;
    }

    function getAfterYieldOracle()
        external
        view
        returns (address afterYieldFunctions)
    {
        afterYieldFunctions = _afterYieldFunctions;
    }

    function getAccountFactory()
        external
        view
        returns (address accountFactory)
    {
        accountFactory = _accountFactory;
    }

    function getFeeCollector() external view returns (address feeCollector) {
        feeCollector = _feeCollector;
    }
}
