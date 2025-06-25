// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IAccount} from "./IAccount.sol";

interface IAccountFactory {
    event AccountCreated(address indexed owner, address account);

    function createAccount() external returns (IAccount account);

    function getAccount(address owner) external view returns (IAccount account);
}
