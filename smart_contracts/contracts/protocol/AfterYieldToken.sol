// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract AfterYieldToken is ERC20, Ownable {
    constructor() ERC20("AfterYieldToken", "AYT") Ownable(_msgSender()) {}

    function addToSupply(uint256 amountScaled) external onlyOwner {
        _mint(_msgSender(), amountScaled);
    }
}
