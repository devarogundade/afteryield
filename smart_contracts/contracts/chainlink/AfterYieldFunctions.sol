// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Enums} from "../libs/Enums.sol";
import {StringHelpers} from "../libs/StringHelpers.sol";
import {IAgent} from "../interfaces/IAgent.sol";
import {IAfterYieldFunctions} from "../interfaces/IAfterYieldFunctions.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract AfterYieldFunctions is FunctionsClient, IAfterYieldFunctions, Ownable {
    using FunctionsRequest for FunctionsRequest.Request;
    using StringHelpers for address;
    using StringHelpers for uint256;

    bytes32 internal _donId;
    string internal _source;
    mapping(bytes32 => address) internal _taskAgents;
    mapping(bytes32 => Enums.TaskType) internal _taskTypes;

    constructor(
        address oracle,
        bytes32 donId,
        string memory source
    ) FunctionsClient(oracle) Ownable(_msgSender()) {
        _donId = donId;
        _source = source;
    }

    function makeRequest(
        Enums.TaskType taskType,
        uint64 subscriptionId,
        uint32 gasLimit
    ) external returns (bytes32 requestId) {
        address agent = _msgSender();

        FunctionsRequest.Request memory req;

        req.initializeRequest(
            FunctionsRequest.Location.Inline,
            FunctionsRequest.CodeLanguage.JavaScript,
            _source
        );

        string[] memory args = new string[](2);
        args[0] = agent.addressToString();
        args[1] = uint256(taskType).uintToString();

        req.setArgs(args);

        requestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            _donId
        );

        _taskAgents[requestId] = agent;
        _taskTypes[requestId] = taskType;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        address agent = _taskAgents[requestId];
        Enums.TaskType taskType = _taskTypes[requestId];

        if (response.length == 0) return;
        if (err.length != 0) return;

        if (taskType == Enums.TaskType.AddStrategy) {
            IAgent(agent).addStrategy(response);
        } else if (taskType == Enums.TaskType.RemoveStrategy) {
            IAgent(agent).removeStrategy(response);
        } else if (taskType == Enums.TaskType.Reallocation) {
            IAgent(agent).reallocation(response);
        } else {
            revert("Invalid task type");
        }

        emit OCRResponse(requestId, response, err);
    }
}
