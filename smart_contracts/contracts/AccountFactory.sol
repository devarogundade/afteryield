// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Account} from "./protocol/Account.sol";
import {IAccount} from "./interfaces/IAccount.sol";
import {IAccountFactory} from "./interfaces/IAccountFactory.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract AccountFactory is IAccountFactory, Ownable, ReentrancyGuard {
    mapping(address => IAccount) internal _accounts;

    constructor() Ownable(_msgSender()) {}

    function createAccount() external nonReentrant returns (IAccount account) {
        address sender = _msgSender();

        if (address(_accounts[sender]) != address(0)) {
            account = IAccount(_accounts[sender]);
        } else {
            account = new Account(sender);
            _accounts[sender] = account;

            emit AccountCreated(sender, address(account));
        }
    }

    function getAccount(
        address owner
    ) external view returns (IAccount account) {
        account = IAccount(_accounts[owner]);
    }
}
