// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Enums} from "./libs/Enums.sol";
import {Consts} from "./libs/Consts.sol";
import {IVault} from "./interfaces/IVault.sol";
import {IAccount} from "./interfaces/IAccount.sol";
import {IAgent} from "./interfaces/IAgent.sol";
import {IStrategy} from "./interfaces/IStrategy.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract VaultUpgradeable is
    IVault,
    OwnableUpgradeable,
    ERC20Upgradeable,
    ReentrancyGuard
{
    address internal _allowedAsset;
    IStrategy[] internal _strategies;
    mapping(IStrategy => uint256) internal _allocations;
    IAgent internal _agent;
    uint256 internal _lastHarvest;

    function __Vault_init(
        string memory name,
        string memory symbol,
        address allowedAsset,
        IAgent agent
    ) internal onlyInitializing {
        __Ownable_init(address(agent));
        __ERC20_init(name, symbol);

        _allowedAsset = allowedAsset;
        _agent = agent;
    }

    function deposit(
        uint256 amountScaled
    ) external nonReentrant returns (uint256 lpMinted) {
        address sender = _msgSender();

        uint256 balanceBefore = getBalance();

        IERC20(_allowedAsset).transferFrom(sender, address(this), amountScaled);

        earn();

        uint256 balanceAfter = getBalance();

        amountScaled = balanceAfter - balanceBefore;

        if (totalSupply() == 0) {
            lpMinted = amountScaled;
        } else {
            lpMinted = (amountScaled * totalSupply()) / balanceBefore;
        }

        _mint(sender, lpMinted);
    }

    function earn() public {
        uint256 available = getAvailable();

        for (uint256 i = 0; i < _strategies.length; i++) {
            IStrategy strategy = _strategies[i];
            uint256 allocation = _allocations[strategy];

            uint256 share = (available * allocation) /
                Consts.STRATEGY_ALLOCATION_MAX;

            if (share == 0) continue;

            if (_allowedAsset == Consts.ETH) {
                payable(address(strategy)).transfer(share);
            } else {
                IERC20(_allowedAsset).transfer(address(strategy), share);
            }

            strategy.deposit();
        }
    }

    function withdraw(uint256 lpAmount) public returns (uint256 amountScaled) {
        address sender = _msgSender();

        uint256 balance = getBalance();

        amountScaled = (balance * lpAmount) / totalSupply();
        _burn(sender, lpAmount);

        uint256 availableBefore = getAvailable();

        if (availableBefore < amountScaled) {
            uint256 remaining = amountScaled - availableBefore;

            for (uint256 i = 0; i < _strategies.length && remaining > 0; i++) {
                IStrategy strategy = _strategies[i];
                uint256 strategyBalance = strategy.getBalanceOf();

                uint256 strategyShare = (strategyBalance * lpAmount) /
                    totalSupply();
                if (strategyShare > remaining) {
                    strategyShare = remaining;
                }

                uint256 withdrawn = strategy.withdraw(strategyShare);
                remaining -= withdrawn;
            }

            uint256 afterAvailable = getAvailable();
            uint256 maxWithdrawable = afterAvailable > amountScaled
                ? amountScaled
                : afterAvailable;
            amountScaled = maxWithdrawable;
        }

        if (_allowedAsset == Consts.ETH) {
            payable(sender).transfer(amountScaled);
        } else {
            IERC20(_allowedAsset).transfer(sender, amountScaled);
        }
    }

    function withdrawAll() external returns (uint256 amountScaled) {
        address sender = _msgSender();
        return withdraw(balanceOf(sender));
    }

    function depositFromAccount(
        uint256 amountScaled,
        IAccount account
    ) external onlyOwner nonReentrant returns (uint256 lpMinted) {
        _agent.checkApproval(account, Enums.ApprovalFlag.Deposit);

        require(account.checkIsAgent(_agent), "Not authorized");

        uint256 balanceBefore = getBalance();

        account.withdrawToVault(amountScaled);

        earn();

        uint256 balanceAfter = getBalance();

        amountScaled = balanceAfter - balanceBefore;

        if (totalSupply() == 0) {
            lpMinted = amountScaled;
        } else {
            lpMinted = (amountScaled * totalSupply()) / balanceBefore;
        }

        _mint(account.getOwner(), lpMinted);
    }

    function withdrawToAccount(
        uint256 lpAmount,
        IAccount account
    ) public onlyOwner returns (uint256 amountScaled) {
        _agent.checkApproval(account, Enums.ApprovalFlag.Withdraw);

        require(account.checkIsAgent(_agent), "Not authorized");

        uint256 balance = getBalance();
        amountScaled = (balance * lpAmount) / totalSupply();
        _burn(account.getOwner(), lpAmount);

        uint256 availableBefore = getAvailable();

        if (availableBefore < amountScaled) {
            uint256 remaining = amountScaled - availableBefore;

            for (uint256 i = 0; i < _strategies.length && remaining > 0; i++) {
                IStrategy strategy = _strategies[i];
                uint256 strategyBalance = strategy.getBalanceOf();

                uint256 strategyShare = (strategyBalance * lpAmount) /
                    totalSupply();
                if (strategyShare > remaining) {
                    strategyShare = remaining;
                }

                uint256 withdrawn = strategy.withdraw(strategyShare);
                remaining -= withdrawn;
            }

            uint256 afterAvailable = getAvailable();
            uint256 maxWithdrawable = afterAvailable > amountScaled
                ? amountScaled
                : afterAvailable;
            amountScaled = maxWithdrawable;
        }

        if (_allowedAsset == Consts.ETH) {
            payable(address(account)).transfer(amountScaled);
        } else {
            IERC20(_allowedAsset).transfer(address(account), amountScaled);
        }
    }

    function withdrawAllToAccount(
        IAccount account
    ) external onlyOwner returns (uint256 amountScaled) {
        return withdrawToAccount(balanceOf(account.getOwner()), account);
    }

    function addStrategy(IStrategy newStrategy) external onlyOwner {
        require(address(newStrategy) != address(0), "Invalid strategy");
        require(!_hasStrategy(newStrategy), "Strategy already exists");

        require(
            address(this) == newStrategy.getVault() &&
                _allowedAsset == newStrategy.getAsset(),
            "Invalid strategy"
        );

        _strategies.push(newStrategy);
    }

    function removeStrategy(IStrategy strategyToRemove) external onlyOwner {
        require(_hasStrategy(strategyToRemove), "Strategy not found");

        uint256 len = _strategies.length;
        for (uint256 i = 0; i < len; i++) {
            if (_strategies[i] == strategyToRemove) {
                _onRemoveStrategy(_strategies[i]);
                _strategies[i] = _strategies[len - 1];
                _strategies.pop();
                delete _allocations[strategyToRemove];
                break;
            }
        }
    }

    function reallocate(uint256[] memory allocations) external onlyOwner {
        require(
            _strategies.length == allocations.length,
            "Mismatched array lengths"
        );

        for (uint256 i = 0; i < _strategies.length; i++) {
            IStrategy strategy = _strategies[i];
            require(_hasStrategy(strategy), "Strategy not found");
            _allocations[strategy] = allocations[i];
        }

        _onAllocationChanged();
    }

    function _hasStrategy(IStrategy strategy) internal view returns (bool) {
        for (uint256 i = 0; i < _strategies.length; i++) {
            if (_strategies[i] == strategy) {
                return true;
            }
        }
        return false;
    }

    function _checkAllocations() internal view returns (uint256 total) {
        for (uint256 i = 0; i < _strategies.length; i++) {
            total += _allocations[_strategies[i]];
        }

        require(
            total <= Consts.STRATEGY_ALLOCATION_MAX,
            "Allocation exceeds max"
        );
    }

    function _onAllocationChanged() internal {
        _checkAllocations();

        for (uint256 i = 0; i < _strategies.length; i++) {
            IStrategy strategy = _strategies[i];
            strategy.exitStrategy();
        }

        earn();
    }

    function _onRemoveStrategy(IStrategy strategy) internal {
        strategy.exitStrategy();
        earn();
    }

    function getLastHarvest(
        uint256 strategyIndex
    ) external view returns (uint256 lastHarvest) {
        lastHarvest = _strategies[strategyIndex].getLastHarvest();
    }

    function getAsset() external view returns (address asset) {
        asset = _allowedAsset;
    }

    function getShares(
        uint256 lpAmount
    ) external view returns (uint256 amountScaled) {
        uint256 balance = getBalance();
        amountScaled = (balance * lpAmount) / totalSupply();
    }

    function getBalance() public view returns (uint256 amountScaled) {
        amountScaled = getAvailable();
        for (uint256 i = 0; i < _strategies.length; i++) {
            amountScaled += _strategies[i].getBalanceOf();
        }
    }

    function getAvailable() public view returns (uint256 available) {
        if (_allowedAsset == Consts.ETH) {
            available = address(this).balance;
        } else {
            available = IERC20(_allowedAsset).balanceOf(address(this));
        }
    }

    function getAllocation(
        IStrategy strategy
    ) external view returns (uint256 allocation) {
        allocation = _allocations[strategy];
    }

    function getSummary()
        external
        view
        returns (uint256 allocated, uint256 idle)
    {
        allocated = 0;
        for (uint256 i = 0; i < _strategies.length; i++) {
            allocated += _allocations[_strategies[i]];
        }
        idle = Consts.STRATEGY_ALLOCATION_MAX - allocated;
    }

    function getStrategies()
        external
        view
        returns (IStrategy[] memory strategies)
    {
        return _strategies;
    }
}
