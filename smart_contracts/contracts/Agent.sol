// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Enums} from "./libs/Enums.sol";
import {IVault} from "./interfaces/IVault.sol";
import {IStrategy} from "./interfaces/IStrategy.sol";
import {IAgent} from "./interfaces/IAgent.sol";
import {IAccount} from "./interfaces/IAccount.sol";
import {IAccountFactory} from "./interfaces/IAccountFactory.sol";
import {IAddressesProvider} from "./interfaces/IAddressesProvider.sol";
import {IAfterYieldFunctions} from "./interfaces/IAfterYieldFunctions.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract Agent is IAgent, Ownable, AutomationCompatibleInterface {
    uint256 internal _feePerTask;
    address internal _feeCollector;
    IERC20 internal _feeToken;
    IAddressesProvider internal _provider;
    mapping(IAccount => Enums.ApprovalFlag) internal _approvals;

    uint256 public _lastTimeStamp;
    uint256 public _interval = 14_000;

    constructor(
        uint256 feePerTask,
        address feeCollector,
        IERC20 feeToken,
        IAddressesProvider provider
    ) Ownable(_msgSender()) {
        _feeToken = feeToken;
        _provider = provider;
        _feePerTask = feePerTask;
        _feeCollector = feeCollector;
    }

    function checkUpkeep(
        bytes calldata
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory checkData)
    {
        upkeepNeeded = (block.timestamp - _lastTimeStamp) > _interval;
        checkData = new bytes(0);
    }

    function performUpkeep(bytes calldata checkData) external override {
        if ((block.timestamp - _lastTimeStamp) > _interval) {
            (
                Enums.TaskType taskType,
                uint64 subscriptionId,
                uint32 gasLimit
            ) = abi.decode(checkData, (Enums.TaskType, uint64, uint32));

            _doUpKeep(taskType, subscriptionId, gasLimit);
        }
    }

    function _doUpKeep(
        Enums.TaskType taskType,
        uint64 subscriptionId,
        uint32 gasLimit
    ) internal returns (bytes32 requestId) {
        IAfterYieldFunctions functions = IAfterYieldFunctions(
            _provider.getAfterYieldFunctions()
        );

        requestId = functions.makeRequest(taskType, subscriptionId, gasLimit);
    }

    /// @dev Needs to safe-guard these deposit/withdraw functions to controller and account owner only.
    /// @dev Needs to call _beforeTask function only is msg.sender is controller.
    function depositFromAccount(
        IVault vault,
        uint256 amountScaled,
        IAccount account
    ) external returns (uint256 lpMinted) {
        _beforeTask(account);

        lpMinted = vault.depositFromAccount(amountScaled, account);
    }

    function withdrawToAccount(
        IVault vault,
        uint256 lpAmount,
        IAccount account
    ) external returns (uint256 amountScaled) {
        _beforeTask(account);

        amountScaled = vault.withdrawToAccount(lpAmount, account);
    }

    function withdrawAllToAccount(
        IVault vault,
        IAccount account
    ) external returns (uint256 amountScaled) {
        _beforeTask(account);

        amountScaled = vault.withdrawAllToAccount(account);
    }

    function addStrategy(bytes memory response) external onlyFunctions {
        (address vault, address strategy) = abi.decode(
            response,
            (address, address)
        );

        IVault(vault).addStrategy(IStrategy(strategy));
    }

    function removeStrategy(bytes memory response) external onlyFunctions {
        (address vault, address strategy) = abi.decode(
            response,
            (address, address)
        );

        IVault(vault).removeStrategy(IStrategy(strategy));
    }

    function reallocation(bytes memory response) external onlyFunctions {
        (address vault, uint256[] memory allocations) = abi.decode(
            response,
            (address, uint256[])
        );

        IVault(vault).reallocate(allocations);
    }

    function approve(Enums.ApprovalFlag flag) external {
        address sender = _msgSender();

        IAccount account = IAccountFactory(_provider.getAccountFactory())
            .getAccount(sender);

        _approvals[account] = flag;

        emit Approval(address(account), flag);
    }

    function allowance(
        IAccount account
    ) external view returns (Enums.ApprovalFlag flag) {
        flag = _approvals[account];
    }

    function getFeeToken() external view returns (IERC20 feeToken) {
        feeToken = _feeToken;
    }

    function checkApproval(
        IAccount account,
        Enums.ApprovalFlag flag
    ) external view {
        Enums.ApprovalFlag accountFlag = _approvals[account];

        // Deny if user has no approval at all
        if (accountFlag == Enums.ApprovalFlag.None) {
            revert("User not approved");
        }

        // If deposit is required, but user doesn't have deposit or all
        if (
            flag == Enums.ApprovalFlag.Deposit &&
            accountFlag != Enums.ApprovalFlag.Deposit &&
            accountFlag != Enums.ApprovalFlag.All
        ) {
            revert("Deposit not approved");
        }

        // If withdraw is required, but user doesn't have withdraw or all
        if (
            flag == Enums.ApprovalFlag.Withdraw &&
            accountFlag != Enums.ApprovalFlag.Withdraw &&
            accountFlag != Enums.ApprovalFlag.All
        ) {
            revert("Withdraw not approved");
        }
    }

    function _beforeTask(IAccount account) internal {
        bool hasFunds = _feeToken.balanceOf(address(account)) >= _feePerTask;

        if (hasFunds) {
            _feeToken.transferFrom(
                address(account),
                _feeCollector,
                _feePerTask
            );
        }

        emit BeforeTask(address(account), address(this), hasFunds);
    }

    modifier onlyFunctions() {
        address sender = _msgSender();
        require(sender == _provider.getAfterYieldFunctions(), "Only functions");
        _;
    }
}
