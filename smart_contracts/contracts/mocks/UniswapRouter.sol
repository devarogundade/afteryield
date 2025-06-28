// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Consts} from "../libs/Consts.sol";
import {ISwapRouter} from "../interfaces/ISwapRouter.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IUniswapV2Router02} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract UniswapRouter is ISwapRouter {
    IUniswapV2Router02 internal _swapRouter;

    constructor(IUniswapV2Router02 swapRouter) {
        _swapRouter = swapRouter;
    }

    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external payable returns (uint256 amountOut) {
        if (tokenIn == tokenOut) {
            return amountIn;
        } else if (tokenIn == Consts.ETH) {
            amountOut = _swapETHToToken(tokenOut);
        } else if (tokenOut == Consts.ETH) {
            amountOut = _swapTokenToETH(tokenIn, amountIn);
        } else {
            amountOut = _swapTokens(tokenIn, tokenOut, amountIn);
        }
    }

    function _swapTokens(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) internal returns (uint256 amountOut) {
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).approve(address(_swapRouter), amountIn);

        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;

        uint256[] memory amounts = _swapRouter.swapExactTokensForTokens(
            amountIn,
            0,
            path,
            msg.sender,
            block.timestamp + 1
        );

        amountOut = amounts[amounts.length - 1];
    }

    function _swapETHToToken(
        address tokenOut
    ) internal returns (uint256 amountOut) {
        require(msg.value > 0, "Invalid ETH amount");

        address[] memory path = new address[](2);
        path[0] = _swapRouter.WETH();
        path[1] = tokenOut;

        uint256[] memory amounts = _swapRouter.swapExactETHForTokens{
            value: msg.value
        }(0, path, msg.sender, block.timestamp + 1);

        amountOut = amounts[amounts.length - 1];
    }

    function _swapTokenToETH(
        address tokenIn,
        uint256 amountIn
    ) internal returns (uint256 amountOut) {
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).approve(address(_swapRouter), amountIn);

        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = _swapRouter.WETH();

        uint256[] memory amounts = _swapRouter.swapExactTokensForETH(
            amountIn,
            0,
            path,
            msg.sender,
            block.timestamp + 1
        );

        amountOut = amounts[amounts.length - 1];
    }

    receive() external payable {}
}
