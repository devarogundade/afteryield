// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IFeeCollector} from "./IFeeCollector.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IBaseStrategy {
    event VaultSetted(address vault);
    event StrategyFeeIdSetted(uint256 feeId);
    event WithdrawalFeeSetted(uint256 fee);
    event SwapRouterSetted(address router);
    event ManagerSetted(address manager);
    event StrategistSetted(address manager);
    event FeeRecipientSetted(address feeRecipient);
    event FeeCollectorSetted(address feeCollector);

    function setStrategyFeeId(uint256 newFeeId) external;

    function setWithdrawalFee(uint256 newFee) external;

    function setVault(address newVault) external;

    function setSwapRouter(address newRouter) external;

    function setManager(address newManager) external;

    function setStrategist(address newStrategist) external;

    function setFeeRecipient(address newFeeRecipient) external;

    function setFeeCollector(IFeeCollector newFeeCollector) external;

    function getStrategyFeeId() external view returns (uint256 strategyFeeId);

    function getVault() external view returns (address vault);

    function swapRouter() external view returns (address router);

    function getDepositFee() external view returns (uint256 depositFee);

    function getWithdrawFee() external view returns (uint256 withdrawFee);
}
