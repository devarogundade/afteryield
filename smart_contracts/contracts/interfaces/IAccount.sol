// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IVault} from "./IVault.sol";
import {IAgent} from "./IAgent.sol";
import {Enums} from "../libs/Enums.sol";

interface IAccount {
    function setModeFor(address vault, Enums.AutoPilotMode mode) external;

    function deposit(address token, uint256 amountScaled) external payable;

    function withdraw(
        address[] memory tokens,
        uint256[] memory amountsScaled
    ) external;

    function withdrawToVault(uint256 amountScaled) external;

    function addAgents(IAgent[] memory agentsToAdd) external;

    function removeAgents(IAgent[] memory agentsToRemove) external;

    function getAgents() external view returns (IAgent[] memory agents);

    function checkIsAgent(IAgent agent) external view returns (bool isAgent);

    function getOwner() external view returns (address account);
}
