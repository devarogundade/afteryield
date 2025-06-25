// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Consts} from "../../libs/Consts.sol";
import {IBaseStrategy} from "../../interfaces/IBaseStrategy.sol";
import {IFeeCollector} from "../../interfaces/IFeeCollector.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

abstract contract BaseStrategy is
    OwnableUpgradeable,
    IBaseStrategy,
    PausableUpgradeable
{
    address internal _vault;
    address internal _manager;
    address internal _swapRouter;
    address internal _strategist;
    address internal _feeRecipient;
    IFeeCollector internal _feeCollector;

    uint256 internal _withdrawalFee;

    struct Config {
        address vault;
        address manager;
        address swapRouter;
        address strategist;
        address feeRecipient;
        address feeCollector;
    }

    function __BaseStrategy_init(
        Config memory config
    ) internal onlyInitializing {
        __Ownable_init(_msgSender());
        __Pausable_init();

        _vault = config.vault;
        _manager = config.manager;
        _swapRouter = config.swapRouter;
        _strategist = config.strategist;
        _feeRecipient = config.feeRecipient;
        _feeCollector = IFeeCollector(config.feeCollector);

        _withdrawalFee = 10;
    }

    function setStrategyFeeId(uint256 newFeeId) external onlyManager {
        _feeCollector.setStrategyFeeId(newFeeId);
        emit StrategyFeeIdSetted(newFeeId);
    }

    function setWithdrawalFee(uint256 newFee) public onlyManager {
        require(newFee <= Consts.WITHDRAWAL_FEE_CAP, "Not capped");
        _withdrawalFee = newFee;
        emit WithdrawalFeeSetted(newFee);
    }

    function setVault(address newVault) external onlyOwner {
        _vault = newVault;
        emit VaultSetted(newVault);
    }

    function setSwapRouter(address newRouter) external onlyOwner {
        _swapRouter = newRouter;
        emit SwapRouterSetted(newRouter);
    }

    function setManager(address newManager) external onlyManager {
        _manager = newManager;
        emit ManagerSetted(newManager);
    }

    function setStrategist(address newStrategist) external {
        require(msg.sender == _strategist, "Already setted");
        _strategist = newStrategist;
        emit StrategistSetted(newStrategist);
    }

    function setFeeRecipient(address newFeeRecipient) external onlyOwner {
        _feeRecipient = newFeeRecipient;
        emit FeeRecipientSetted(newFeeRecipient);
    }

    function setFeeCollector(IFeeCollector newFeeCollector) external onlyOwner {
        _feeCollector = newFeeCollector;
        emit FeeCollectorSetted(address(newFeeCollector));
    }

    function _beforeDeposit() internal virtual;

    function getStrategyFeeId() external view returns (uint256 strategyFeeId) {
        strategyFeeId = _feeCollector.strategyFeeId(address(this));
    }

    function getVault() external view returns (address vault) {
        vault = _vault;
    }

    function swapRouter() external view returns (address router) {
        router = _swapRouter;
    }

    function getDepositFee() public pure returns (uint256 depositFee) {
        depositFee = 0;
    }

    function getWithdrawFee() public view returns (uint256 withdrawFee) {
        withdrawFee = paused() ? 0 : _withdrawalFee;
    }

    function getAllFees() external view returns (IFeeCollector.AllFees memory) {
        return
            IFeeCollector.AllFees(
                _getFees(),
                getDepositFee(),
                getWithdrawFee()
            );
    }

    function _getFees()
        internal
        view
        returns (IFeeCollector.FeeCategory memory)
    {
        return _feeCollector.getFees(address(this));
    }

    function _checkManager() internal view {
        address sender = _msgSender();
        require(sender == owner() || sender == _manager, "Not a manager");
    }

    modifier onlyManager() {
        _checkManager();
        _;
    }
}
