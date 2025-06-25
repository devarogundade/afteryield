// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Consts} from "../libs/Consts.sol";
import {ISwapRouter} from "../interfaces/ISwapRouter.sol";
import {IStrategy} from "../interfaces/IStrategy.sol";
import {IFeeCollector} from "../interfaces/IFeeCollector.sol";
import {IWETH} from "../interfaces/shared/IWETH.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

abstract contract BaseNativeStrategy is
    OwnableUpgradeable,
    IStrategy,
    PausableUpgradeable
{
    // =========== Tokens used =========== //

    address public WETH;
    address public _asset;
    address public _iToken;
    address[] public _rewardTokens;
    mapping(address => uint256) internal _minAmountsToSwap;

    // === //

    address internal _vault;
    address internal _manager;
    address internal _swapRouter;
    address internal _strategist;
    address internal _feeRecipient;
    IFeeCollector internal _feeCollector;

    uint256 internal _withdrawalFee;

    // === //

    uint256 internal _lastHarvest;
    uint256 internal _totalLocked;
    uint256 internal _lockDuration;
    bool internal _harvestOnDeposit;

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

        _withdrawalFee = 0;
    }

    function deposit() public whenNotPaused {
        uint256 assetBalance = getBalanceOfAsset();
        if (assetBalance > 0) {
            _deposit(assetBalance);
            emit Deposit(getBalanceOf());
        }
    }

    function withdraw(
        uint256 amountScaled
    ) external onlyVault returns (uint256 withdrawn) {
        withdrawn = getBalanceOfAsset();

        if (withdrawn < amountScaled) {
            _withdraw(amountScaled - withdrawn);
            withdrawn = getBalanceOfAsset();
        }

        if (withdrawn > amountScaled) {
            withdrawn = amountScaled;
        }

        IERC20(_asset).transfer(_vault, withdrawn);

        emit Withdraw(getBalanceOf());
    }

    function beforeDeposit() external virtual onlyVault {
        if (_harvestOnDeposit) {
            _harvest(tx.origin, true);
        }
    }

    function harvest() external {
        _harvest(tx.origin, false);
    }

    function harvestWithCallFeeRecipient(address callFeeRecipient) external {
        _harvest(callFeeRecipient, false);
    }

    function managerHarvest() external onlyManager {
        _harvest(tx.origin, false);
    }

    function _deposit(uint256 amount) internal virtual;

    function _withdraw(uint256 amount) internal virtual;

    function _emergencyWithdraw() internal virtual;

    function _claim() internal virtual;

    function _getBalanceOfPool()
        internal
        view
        virtual
        returns (uint256 balanceOfAsset);

    function _verifyRewardToken(address token) internal view virtual;

    function _harvest(
        address callFeeRecipient,
        bool onDeposit
    ) internal whenNotPaused {
        _claim();

        _swapRewardTokensToWETH();

        uint256 nativeBalance = IERC20(WETH).balanceOf(address(this));
        if (nativeBalance > _minAmountsToSwap[WETH]) {
            _chargeFees(callFeeRecipient);

            _swapWETHToAsset();

            uint256 wantHarvested = getBalanceOfAsset();

            _totalLocked = wantHarvested + getLockedProfit();
            _lastHarvest = block.timestamp;

            if (!onDeposit) {
                deposit();
            }

            emit StrategyHarvest(msg.sender, wantHarvested, getBalanceOf());
        }
    }

    function _swapRewardTokensToWETH() internal virtual {
        for (uint256 i; i < _rewardTokens.length; ++i) {
            address token = _rewardTokens[i];
            if (token == Consts.ETH) {
                IWETH(WETH).deposit{value: address(this).balance}();
            } else {
                uint256 amount = IERC20(token).balanceOf(address(this));
                if (amount > _minAmountsToSwap[token]) {
                    _swap(token, WETH, amount);
                }
            }
        }
    }

    function _chargeFees(address callFeeRecipient) internal {
        IFeeCollector.FeeCategory memory fees = _getFees();

        uint256 nativeBalance = (IERC20(WETH).balanceOf(address(this)) *
            fees.total) / Consts.DIVISOR;

        uint256 callFeeAmount = (nativeBalance * fees.call) / Consts.DIVISOR;
        IERC20(WETH).transfer(callFeeRecipient, callFeeAmount);

        uint256 feeAmount = (nativeBalance * fees.protocol) / Consts.DIVISOR;
        IERC20(WETH).transfer(_feeRecipient, feeAmount);

        uint256 strategistFeeAmount = (nativeBalance * fees.strategist) /
            Consts.DIVISOR;
        IERC20(WETH).transfer(_strategist, strategistFeeAmount);

        emit ChargedFees(callFeeAmount, feeAmount, strategistFeeAmount);
    }

    function _swapWETHToAsset() internal virtual {
        if (_asset == address(0)) {
            _swap(WETH, _asset);
        } else {
            if (_asset != WETH) {
                _swap(WETH, _asset);
            }
            _swap(_asset, _asset);
        }
    }

    function _swap(address tokenFrom, address tokenTo) internal {
        uint256 bal = IERC20(tokenFrom).balanceOf(address(this));
        _swap(tokenFrom, tokenTo, bal);
    }

    function _swap(
        address tokenFrom,
        address tokenTo,
        uint256 amount
    ) internal {
        if (tokenFrom != tokenTo) {
            IERC20(tokenFrom).approve(_swapRouter, amount);
            ISwapRouter(_swapRouter).swap(tokenFrom, tokenTo, amount);
        }
    }

    function rewardsLength() external view returns (uint256) {
        return _rewardTokens.length;
    }

    function addReward(address rewardToken) public onlyManager {
        require(rewardToken != _asset, "Not asset");
        require(rewardToken != WETH, "Not native");

        _verifyRewardToken(rewardToken);
        _rewardTokens.push(rewardToken);
    }

    function removeReward(uint256 i) external onlyManager {
        _rewardTokens[i] = _rewardTokens[_rewardTokens.length - 1];
        _rewardTokens.pop();
    }

    function resetRewards() external onlyManager {
        delete _rewardTokens;
    }

    function setRewardMinAmount(
        address rewardToken,
        uint256 minAmount
    ) external onlyManager {
        _minAmountsToSwap[rewardToken] = minAmount;
    }

    function setAsset(address newAsset) public onlyManager {
        if (newAsset == address(0)) {
            _asset = address(0);
            return;
        }

        require(newAsset != _asset, "Not asset");

        _verifyRewardToken(newAsset);
        _asset = newAsset;
    }

    function getLockedProfit() public view returns (uint256) {
        if (_lockDuration == 0) return 0;

        uint256 elapsed = block.timestamp - _lastHarvest;
        uint256 remaining = elapsed < _lockDuration
            ? _lockDuration - elapsed
            : 0;

        return (_totalLocked * remaining) / _lockDuration;
    }

    function getBalanceOf() public view returns (uint256) {
        return getBalanceOfAsset() + _getBalanceOfPool() - getLockedProfit();
    }

    function getBalanceOfPool() public view returns (uint256 balanceOfPool) {
        balanceOfPool = _getBalanceOfPool();
    }

    function getBalanceOfAsset() public view returns (uint256) {
        return IERC20(_asset).balanceOf(address(this));
    }

    function setHarvestOnDeposit(bool harvestOnDeposit) public onlyManager {
        _harvestOnDeposit = harvestOnDeposit;

        if (harvestOnDeposit) {
            _lockDuration = 0;
        } else {
            _lockDuration = 1 days;
        }
    }

    function setLockDuration(uint256 newDuration) external onlyManager {
        _lockDuration = newDuration;
    }

    function rewardsAvailable() external view virtual returns (uint256) {
        return 0;
    }

    function callReward() external view virtual returns (uint256) {
        return 0;
    }

    function exitStrategy() external onlyVault {
        _emergencyWithdraw();
        IERC20(_asset).transfer(_vault, getBalanceOfAsset());
    }

    function panic() public virtual onlyManager {
        pause();
        _emergencyWithdraw();
    }

    function pause() public virtual onlyManager {
        _pause();
    }

    function unpause() external virtual onlyManager {
        _unpause();
        deposit();
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

    function getAsset() external view returns (address asset) {
        asset = _asset;
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

    receive() external payable {}

    uint256[49] private __gap;

    // =========== MODIFIERS =========== //

    function _checkManager() internal view {
        address sender = _msgSender();
        require(sender == owner() || sender == _manager, "Not a manager");
    }

    modifier onlyManager() {
        _checkManager();
        _;
    }

    modifier onlyVault() {
        address sender = _msgSender();
        require(sender == _vault, "Not _vault");
        _;
    }
}
