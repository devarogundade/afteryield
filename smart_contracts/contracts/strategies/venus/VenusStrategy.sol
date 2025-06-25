// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Consts} from "../../libs/Consts.sol";
import {BaseStrategy} from "../__base/BaseStrategy.sol";
import {ISwapRouter} from "../../interfaces/ISwapRouter.sol";
import {IStrategy} from "../../interfaces/IStrategy.sol";
import {IFeeCollector} from "../../interfaces/IFeeCollector.sol";
import {IWETH} from "../../interfaces/shared/IWETH.sol";
import {IVToken} from "../../interfaces/shared/IVToken.sol";
import {IVenusRewarder} from "../../interfaces/venus/IVenusRewarder.sol";
import {IVenusComptroller} from "../../interfaces/venus/IVenusComptroller.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VenusStrategy is Initializable, IStrategy, BaseStrategy {
    // =========== Tokens used =========== //

    address public WETH;
    address public _asset;
    address public _iToken;
    address[] public _rewardTokens;

    // =========== Third party contracts =========== //

    address public _rewarder;
    address[] public _markets;
    address public _comptroller;

    uint256 public _lastHarvest;
    uint256 public _balanceOfPool;
    bool public _harvestOnDeposit;

    function initialize(
        address market,
        address __WETH,
        BaseStrategy.Config calldata config
    ) external initializer {
        __BaseStrategy_init(config);

        _iToken = market;
        _markets.push(market);
        _comptroller = IVToken(market).comptroller();
        _asset = IVToken(market).underlying();
        address[] memory rewarders = IVenusComptroller(_comptroller)
            .getRewardDistributors();
        _rewarder = rewarders[0];

        _rewardTokens.push(IVenusRewarder(_rewarder).rewardToken());
        WETH = __WETH;

        _giveAllowances();
        IVenusComptroller(_comptroller).enterMarkets(_markets);
    }

    function deposit() public onlyVault whenNotPaused {
        uint256 assetBalance = getBalanceOfAsset();

        if (assetBalance > 0) {
            _beforeDeposit();

            IVToken(_iToken).mint(assetBalance);
            _updateBalance();

            emit Deposit(getBalanceOf());
        }
    }

    function withdraw(
        uint256 amountScaled
    ) external onlyVault returns (uint256 withdrawn) {
        withdrawn = getBalanceOfAsset();

        if (withdrawn < amountScaled) {
            uint256 errorCode = IVToken(_iToken).redeemUnderlying(
                amountScaled - withdrawn
            );

            require(errorCode == 0, "Error while trying to redeem");

            _updateBalance();
            withdrawn = IERC20(_asset).balanceOf(address(this));
        }

        if (withdrawn > amountScaled) {
            withdrawn = amountScaled;
        }

        if (tx.origin != owner() && !paused()) {
            uint256 withdrawalFeeAmount = (withdrawn * _withdrawalFee) /
                Consts.WITHDRAWAL_MAX;
            withdrawn = withdrawn - withdrawalFeeAmount;
        }

        IERC20(_asset).transfer(_vault, withdrawn);

        emit Withdraw(getBalanceOf());
    }

    function _beforeDeposit() internal override {
        address sender = _msgSender();

        if (_harvestOnDeposit && sender == _vault) {
            _harvest(tx.origin);
        }

        _updateBalance();
    }

    function harvest() external {
        _harvest(tx.origin);
    }

    function harvestWithCallFeeRecipient(address callFeeRecipient) external {
        _harvest(callFeeRecipient);
    }

    function managerHarvest() external onlyManager {
        _harvest(tx.origin);
    }

    function setHarvestOnDeposit(
        bool newHarvestOnDeposit
    ) external onlyManager {
        _harvestOnDeposit = newHarvestOnDeposit;

        if (_harvestOnDeposit) {
            super.setWithdrawalFee(0);
        } else {
            super.setWithdrawalFee(10);
        }
    }

    function exitStrategy() external onlyVault {
        uint256 errorCode = IVToken(_iToken).redeem(
            IERC20(_iToken).balanceOf(address(this))
        );
        require(errorCode == 0, "Error while trying to redeem");
        _updateBalance();

        uint256 assetBalance = IERC20(_asset).balanceOf(address(this));
        IERC20(_asset).transfer(_vault, assetBalance);
    }

    function panic() public onlyManager {
        uint256 errorCode = IVToken(_iToken).redeem(
            IERC20(_iToken).balanceOf(address(this))
        );
        require(errorCode == 0, "Error while trying to redeem");
        _updateBalance();

        pause();
    }

    function setReward(address newReward) external onlyOwner {
        require(newReward != _asset, "Reward cannot be asset");
        require(newReward != _iToken, "Reward cannot be iToken");

        _rewardTokens.push(newReward);

        IERC20(newReward).approve(_swapRouter, type(uint256).max);
    }

    function resetRewards() external onlyManager {
        for (uint256 i; i < _rewardTokens.length; ++i) {
            IERC20(_rewardTokens[i]).approve(_swapRouter, 0);
        }

        delete _rewardTokens;
    }

    function setRewarder(address newRewarder) external onlyOwner {
        for (uint256 i; i < _rewardTokens.length; ++i) {
            IERC20(_rewardTokens[i]).approve(_swapRouter, 0);
        }

        delete _rewardTokens;

        _rewarder = newRewarder;
        _rewardTokens.push(IVenusRewarder(_rewarder).rewardToken());
        IERC20(_rewardTokens[0]).approve(_swapRouter, type(uint256).max);
    }

    function pause() public onlyManager {
        _pause();
        _removeAllowances();
    }

    function unpause() external onlyManager {
        _unpause();
        _giveAllowances();
        deposit();
    }

    // =========== INTERNAL FUNCTIONS =========== //

    function _harvest(address callFeeRecipient) internal whenNotPaused {
        uint256 beforeBalance = getBalanceOfAsset();
        IVenusRewarder(_rewarder).claimRewardToken(address(this), _markets);

        _swapRewardTokenToWETH();

        uint256 nativeBalance = IERC20(WETH).balanceOf(address(this));
        if (_asset == WETH) nativeBalance -= beforeBalance;

        if (nativeBalance > 0) {
            _chargeFees(callFeeRecipient, nativeBalance);
            _swapWETHToAsset();

            uint256 assetHarvested = getBalanceOfAsset() - beforeBalance;
            deposit();

            _lastHarvest = block.timestamp;

            emit StrategyHarvest(_msgSender(), assetHarvested, getBalanceOf());
        }
    }

    function _chargeFees(
        address callFeeRecipient,
        uint256 rewardBalance
    ) internal {
        IFeeCollector.FeeCategory memory fees = _getFees();
        uint256 feeBalance = (rewardBalance * fees.total) / Consts.DIVISOR;

        uint256 callFeeAmount = (feeBalance * fees.call) / Consts.DIVISOR;
        IERC20(WETH).transfer(callFeeRecipient, callFeeAmount);

        uint256 feeAmount = (feeBalance * fees.protocol) / Consts.DIVISOR;
        IERC20(WETH).transfer(_feeRecipient, feeAmount);

        uint256 strategistFeeAmount = (feeBalance * fees.strategist) /
            Consts.DIVISOR;
        IERC20(WETH).transfer(_strategist, strategistFeeAmount);

        emit ChargedFees(callFeeAmount, feeAmount, strategistFeeAmount);
    }

    function _swapRewardTokenToWETH() internal {
        for (uint256 i; i < _rewardTokens.length; ++i) {
            address rewardToken = _rewardTokens[i];
            uint256 rewardBalance = IERC20(rewardToken).balanceOf(
                address(this)
            );
            if (rewardBalance > 0)
                ISwapRouter(_swapRouter).swap(rewardToken, WETH, rewardBalance);
        }
    }

    function _swapWETHToAsset() internal {
        if (_asset != WETH) {
            uint256 nativeBalance = IERC20(WETH).balanceOf(address(this));
            ISwapRouter(_swapRouter).swap(WETH, _asset, nativeBalance);
        }
    }

    function _updateBalance() internal {
        _balanceOfPool = IVToken(_iToken).balanceOfUnderlying(address(this));
    }

    function _giveAllowances() internal {
        IERC20(_asset).approve(_iToken, type(uint256).max);
        IERC20(WETH).approve(_swapRouter, type(uint256).max);

        for (uint256 i; i < _rewardTokens.length; ++i) {
            IERC20(_rewardTokens[i]).approve(_swapRouter, 0);
            IERC20(_rewardTokens[i]).approve(_swapRouter, type(uint256).max);
        }
    }

    function _removeAllowances() internal {
        IERC20(_asset).approve(_iToken, 0);
        IERC20(WETH).approve(_swapRouter, 0);

        for (uint256 i; i < _rewardTokens.length; ++i) {
            IERC20(_rewardTokens[i]).approve(_swapRouter, 0);
        }
    }

    // =========== VIEW FUNCTIONS =========== //

    function getAsset() external view returns (address asset) {
        asset = _asset;
    }

    function getBalanceOf() public view returns (uint256) {
        return getBalanceOfAsset() + _balanceOfPool;
    }

    function getBalanceOfAsset() public view returns (uint256) {
        return IERC20(_asset).balanceOf(address(this));
    }

    function getBalanceOfPool() external view returns (uint256 balanceOfPool) {
        balanceOfPool = _balanceOfPool;
    }

    receive() external payable {
        IWETH(WETH).deposit{value: msg.value}();
    }

    // =========== MODIFIERS =========== //

    modifier onlyVault() {
        address sender = _msgSender();
        require(sender == _vault, "Not vault");
        _;
    }
}
