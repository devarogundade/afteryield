// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {BaseNativeStrategy} from "../__base/BaseNativeStrategy.sol";
import {IMerkleClaimer} from "../../interfaces/shared/IMerkleClaimer.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IAToken} from "@aave/core-v3/contracts/interfaces/IAToken.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {DataTypes} from "@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol";
import {IRewardsController} from "@aave/periphery-v3/contracts/rewards/interfaces/IRewardsController.sol";

contract AaveSupplyOnlyStrategy is BaseNativeStrategy {
    address public _aToken;
    address public _lendingPool;
    address public _rewardsController;

    function initialize(
        address poolAddressesProvider,
        address _WETH,
        address aToken,
        bool harvestOnDeposit,
        address asset,
        address[] memory rewardTokens,
        Config memory config
    ) public initializer {
        __BaseStrategy_init(config);

        _aToken = aToken;
        _lendingPool = IPoolAddressesProvider(poolAddressesProvider).getPool();

        // TO DO ~ _rewardsController = IAToken(aToken).rewardsController();

        if (harvestOnDeposit) setHarvestOnDeposit(true);

        for (uint256 i; i < rewardTokens.length; i++) {
            addReward(rewardTokens[i]);
        }

        WETH = _WETH;
        _asset = asset;
        _rewardTokens = rewardTokens;
        _lockDuration = 1 days;
    }

    function _deposit(uint256 amountScaled) internal override {
        IERC20(_asset).approve(_lendingPool, amountScaled);
        IPool(_lendingPool).deposit(_asset, amountScaled, address(this), 0);
    }

    function _withdraw(uint256 amountScaled) internal override {
        if (amountScaled > 0) {
            IPool(_lendingPool).withdraw(_asset, amountScaled, address(this));
        }
    }

    function _emergencyWithdraw() internal override {
        uint256 balanceOfPool = _getBalanceOfPool();
        if (balanceOfPool > 0) {
            IPool(_lendingPool).withdraw(_asset, type(uint).max, address(this));
        }
    }

    function _claim() internal override {
        // address[] memory assets = new address[](1);
        // assets[0] = _aToken;
        // IRewardsController(_rewardsController).claimAllRewards(
        //     assets,
        //     address(this)
        // );
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

    function getBaseRate() external view returns (uint256 baseRate) {
        DataTypes.ReserveData memory reserveData = IPool(_lendingPool)
            .getReserveData(_asset);

        baseRate = reserveData.currentLiquidityRate;
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
