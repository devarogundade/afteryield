// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {BaseNativeStrategy} from "../__base/BaseNativeStrategy.sol";
import {IAaveToken} from "../../interfaces/aave/IAaveToken.sol";
import {IAaveV3Incentives} from "../../interfaces/aave/IAaveV3Incentives.sol";
import {IIncentivesController} from "../../interfaces/aave/IIncentivesController.sol";
import {ILendingPool} from "../../interfaces/aave/ILendingPool.sol";
import {IMerkleClaimer} from "../../interfaces/shared/IMerkleClaimer.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AaveSupplyOnlyStrategy is BaseNativeStrategy {
    address internal _aToken;
    address internal _lendingPool;
    address internal _incentivesController;

    function initialize(
        address aToken,
        bool harvestOnDeposit,
        address asset,
        address[] memory rewardTokens,
        Config memory config
    ) public initializer {
        __BaseStrategy_init(config);

        _aToken = aToken;
        _lendingPool = IAaveToken(aToken).POOL();
        _incentivesController = IAaveToken(aToken).getIncentivesController();

        if (harvestOnDeposit) setHarvestOnDeposit(true);

        for (uint256 i; i < rewardTokens.length; i++) {
            addReward(rewardTokens[i]);
        }

        _asset = asset;
        _rewardTokens = rewardTokens;
        _lockDuration = 1 days;
    }

    function _deposit(uint256 amountScaled) internal override {
        IERC20(_asset).approve(_lendingPool, amountScaled);
        ILendingPool(_lendingPool).deposit(
            _asset,
            amountScaled,
            address(this),
            0
        );
    }

    function _withdraw(uint256 amountScaled) internal override {
        if (amountScaled > 0) {
            ILendingPool(_lendingPool).withdraw(
                _asset,
                amountScaled,
                address(this)
            );
        }
    }

    function _emergencyWithdraw() internal override {
        uint256 balanceOfPool = _getBalanceOfPool();
        if (balanceOfPool > 0) {
            ILendingPool(_lendingPool).withdraw(
                _asset,
                type(uint).max,
                address(this)
            );
        }
    }

    function _claim() internal override {
        address[] memory assets = new address[](1);
        assets[0] = _aToken;

        IAaveV3Incentives(_incentivesController).claimAllRewards(
            assets,
            address(this)
        );
    }

    function _getBalanceOfPool()
        internal
        view
        override
        returns (uint256 balanceOfAsset)
    {
        balanceOfAsset = IERC20(_aToken).balanceOf(address(this));
    }

    function _verifyRewardToken(address token) internal view override {
        require(token != _aToken, "Not aToken");
    }

    function _beforeDeposit() internal override {}

    function merkleClaim(
        address claimer,
        address[] calldata users,
        address[] calldata tokens,
        uint256[] calldata amounts,
        bytes32[][] calldata proofs
    ) external {
        IMerkleClaimer(claimer).claim(users, tokens, amounts, proofs);
    }

    function setReward(address newReward) external {}

    function setRewarder(address newRewarder) external {}
}
