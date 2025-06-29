// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Enums} from "../libs/Enums.sol";
import {Consts} from "../libs/Consts.sol";
import {IAgent} from "../interfaces/IAgent.sol";
import {IVault} from "../interfaces/IVault.sol";
import {IAccount} from "../interfaces/IAccount.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Account is IAccount, Ownable {
    IAgent[] internal _agents;
    mapping(address => Enums.AutoPilotMode) internal _vaultModes;

    constructor(address owner) Ownable(owner) {}

    function setModeFor(
        address vault,
        Enums.AutoPilotMode mode
    ) external onlyOwner {
        _vaultModes[vault] = mode;
    }

    function deposit(
        address token,
        uint256 amountScaled
    ) external payable onlyOwner {
        if (token == Consts.ETH) {
            require(msg.value == amountScaled, "Incorrect ETH value sent");
        } else {
            IERC20(token).transferFrom(owner(), address(this), amountScaled);
        }
    }

    function withdraw(
        address[] memory tokens,
        uint256[] memory amountsScaled
    ) external onlyOwner {
        require(
            tokens.length == amountsScaled.length,
            "Mismatched array lengths"
        );

        for (uint256 i = 0; i < tokens.length; i++) {
            address token = tokens[i];
            uint256 amount = amountsScaled[i];

            if (token == Consts.ETH) {
                payable(owner()).transfer(amount);
            } else {
                IERC20(token).transfer(owner(), amount);
            }
        }
    }

    function withdrawToVault(uint256 amountScaled) external {
        address vault = _msgSender();

        require(
            _vaultModes[vault] == Enums.AutoPilotMode.On,
            "AutoPilot is off"
        );

        address token = IVault(vault).getAsset();

        if (token == Consts.ETH) {
            payable(vault).transfer(amountScaled);
        } else {
            IERC20(token).transfer(vault, amountScaled);
        }
    }

    function addAgents(IAgent[] memory agentsToAdd) external onlyOwner {
        for (uint256 i = 0; i < agentsToAdd.length; i++) {
            IAgent agent = agentsToAdd[i];
            if (!_isAgent(agent)) {
                _agents.push(agent);
                IERC20 feeToken = IAgent(agent).getFeeToken();
                feeToken.approve(address(agent), type(uint256).max);
            }
        }
    }

    function removeAgents(IAgent[] memory agentsToRemove) external onlyOwner {
        for (uint256 i = 0; i < agentsToRemove.length; i++) {
            IAgent agent = agentsToRemove[i];
            for (uint256 j = 0; j < _agents.length; j++) {
                if (_agents[j] == agent) {
                    _agents[j] = _agents[_agents.length - 1];
                    _agents.pop();

                    IERC20 feeToken = IAgent(agent).getFeeToken();
                    feeToken.approve(address(agent), 0);

                    break;
                }
            }
        }
    }

    function getAgents() external view returns (IAgent[] memory agents) {
        agents = _agents;
    }

    function getModeFor(
        address vault
    ) external view returns (Enums.AutoPilotMode mode) {
        mode = _vaultModes[vault];
    }

    function checkIsAgent(IAgent agent) external view returns (bool isAgent) {
        isAgent = _isAgent(agent);
    }

    function getOwner() external view returns (address account) {
        account = owner();
    }

    function _isAgent(IAgent agent) internal view returns (bool) {
        for (uint256 i = 0; i < _agents.length; i++) {
            if (_agents[i] == agent) return true;
        }
        return false;
    }

    receive() external payable {}
}
