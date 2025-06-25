// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IAfterYieldOracle} from "../interfaces/IAfterYieldOracle.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract AfterYieldOracle is IAfterYieldOracle, Ownable {
    mapping(address => address) internal _tokenFeeds;

    constructor() Ownable(_msgSender()) {}

    function setFeed(address token, address feed) external onlyOwner {
        _tokenFeeds[token] = feed;

        emit TokenFeedSetted(token, feed);
    }

    function getPrice(
        address token
    ) external view returns (int256 answer, uint80 decimals) {
        (, answer, , , decimals) = AggregatorV3Interface(_tokenFeeds[token])
            .latestRoundData();
    }
}
