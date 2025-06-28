// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Enums} from "../libs/Enums.sol";

interface IAfterYieldFunctions {
    event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);

    function makeRequest(
        Enums.TaskType taskType,
        uint64 subscriptionId,
        uint32 gasLimit
    ) external returns (bytes32 requestId);
}
