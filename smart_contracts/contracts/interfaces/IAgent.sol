// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IVault} from "./IVault.sol";
import {IAccount} from "./IAccount.sol";
import {Enums} from "../libs/Enums.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAgent {
    event Approval(address account, Enums.ApprovalFlag flag);
    event BeforeTask(address account, address agent, bool hasFunds);

    function depositFromAccount(
        IVault vault,
        uint256 amountScaled,
        IAccount account
    ) external returns (uint256 lpMinted);

    function withdrawToAccount(
        IVault vault,
        uint256 lpAmount,
        IAccount account
    ) external returns (uint256 amountScaled);

    function withdrawAllToAccount(
        IVault vault,
        IAccount account
    ) external returns (uint256 amountScaled);

    function addStrategy(bytes memory response) external;

    function removeStrategy(bytes memory response) external;

    function reallocation(bytes memory response) external;

    function approve(Enums.ApprovalFlag flag) external;

    function allowance(
        IAccount account
    ) external view returns (Enums.ApprovalFlag flag);

    function getFeeToken() external view returns (IERC20 feeToken);

    function checkApproval(
        IAccount account,
        Enums.ApprovalFlag flag
    ) external view;
}
