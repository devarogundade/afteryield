// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {VaultUpgradeable} from "../VaultUpgradeable.sol";
import {Consts} from "../libs/Consts.sol";
import {Enums} from "../libs/Enums.sol";
import {IAgent} from "../interfaces/IAgent.sol";
import {IAccount} from "../interfaces/IAccount.sol";
import {IStrategy} from "../interfaces/IStrategy.sol";
import {IAddressesProvider} from "../interfaces/IAddressesProvider.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract SimpleVault is Initializable, VaultUpgradeable {
    function initialize(
        string memory name,
        string memory symbol,
        address allowedAsset,
        IAgent agent,
        IStrategy[] memory initStrategies,
        uint256[] memory initAllocations
    ) external initializer {
        __Vault_init(
            name,
            symbol,
            allowedAsset,
            agent,
            initStrategies,
            initAllocations
        );
    }
}
