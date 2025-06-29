import { agentABI } from "@/abis/agent";
import { config } from "@/scripts/config";
import { zeroAddress, type Hex } from "viem";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { ApprovalFlag, AutoPilotMode } from "./types";
import { accountABI } from "@/abis/account";
import { vaultABI } from "@/abis/vault";
import { accountFactoryABI } from "@/abis/account-factory";
import { Provider } from "./constants";

const AgentContract = {
  async depositFromAccount(
    agentAddress: Hex,
    vaultAddress: Hex,
    amountScaled: bigint,
    accountAddress: Hex
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: agentABI,
        address: agentAddress,
        functionName: "depositFromAccount",
        args: [vaultAddress, amountScaled, accountAddress],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async withdrawToAccount(
    agentAddress: Hex,
    vaultAddress: Hex,
    lpAmount: bigint,
    accountAddress: Hex
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: agentABI,
        address: agentAddress,
        functionName: "withdrawToAccount",
        args: [vaultAddress, lpAmount, accountAddress],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async withdrawAllToAccount(
    agentAddress: Hex,
    vaultAddress: Hex,
    accountAddress: Hex
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: agentABI,
        address: agentAddress,
        functionName: "withdrawAllToAccount",
        args: [vaultAddress, accountAddress],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async approve(agentAddress: Hex, flag: ApprovalFlag): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: agentABI,
        address: agentAddress,
        functionName: "approve",
        args: [flag],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },
};

const AccountContract = {
  async setModeFor(
    accountAddress: Hex,
    vaultAddress: Hex,
    mode: AutoPilotMode
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: accountABI,
        address: accountAddress,
        functionName: "setModeFor",
        args: [vaultAddress, mode],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async deposit(
    accountAddress: Hex,
    tokenAddress: Hex,
    amountScaled: bigint
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: accountABI,
        address: accountAddress,
        functionName: "deposit",
        args: [tokenAddress, amountScaled],
        value: tokenAddress === zeroAddress ? amountScaled : BigInt(0),
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async withdraw(
    accountAddress: Hex,
    tokenAddresses: Hex[],
    amountScaleds: bigint[]
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: accountABI,
        address: accountAddress,
        functionName: "withdraw",
        args: [tokenAddresses, amountScaleds],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async addAgents(
    accountAddress: Hex,
    agentAddresses: Hex[]
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: accountABI,
        address: accountAddress,
        functionName: "addAgents",
        args: [agentAddresses],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async removeAgents(
    accountAddress: Hex,
    agentAddresses: Hex[]
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: accountABI,
        address: accountAddress,
        functionName: "removeAgents",
        args: [agentAddresses],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async getAgents(accountAddress: Hex): Promise<Hex[] | null> {
    try {
      return (await readContract(config, {
        abi: accountABI,
        address: accountAddress,
        functionName: "getAgents",
      })) as any;
    } catch (error) {
      return null;
    }
  },
  async getModeFor(
    accountAddress: Hex,
    vaultAddress: Hex
  ): Promise<AutoPilotMode> {
    try {
      return (await readContract(config, {
        abi: accountABI,
        address: accountAddress,
        functionName: "getModeFor",
        args: [vaultAddress],
      })) as AutoPilotMode;
    } catch (error) {
      return AutoPilotMode.Off;
    }
  },

  async checkIsAgent(
    accountAddress: Hex,
    agentAddress: Hex
  ): Promise<boolean | null> {
    try {
      return (await readContract(config, {
        abi: accountABI,
        address: accountAddress,
        functionName: "checkIsAgent",
        args: [agentAddress],
      })) as any;
    } catch (error) {
      return null;
    }
  },

  async getOwner(accountAddress: Hex): Promise<Hex | null> {
    try {
      return (await readContract(config, {
        abi: accountABI,
        address: accountAddress,
        functionName: "getOwner",
      })) as any;
    } catch (error) {
      return null;
    }
  },
};

const VaultContract = {
  async deposit(
    vaultAddress: Hex,
    amountScaled: bigint,
    isNative: boolean = false
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: vaultABI,
        address: vaultAddress,
        functionName: "deposit",
        args: [amountScaled],
        value: isNative ? amountScaled : BigInt(0),
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async withdraw(vaultAddress: Hex, lpAmount: bigint): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: vaultABI,
        address: vaultAddress,
        functionName: "withdraw",
        args: [lpAmount],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async getAsset(vaultAddress: Hex): Promise<Hex | null> {
    try {
      return (await readContract(config, {
        abi: vaultABI,
        address: vaultAddress,
        functionName: "getAsset",
      })) as any;
    } catch (error) {
      return null;
    }
  },

  async getShares(vaultAddress: Hex, lpAmount: bigint): Promise<bigint | null> {
    try {
      return (await readContract(config, {
        abi: vaultABI,
        address: vaultAddress,
        functionName: "getShares",
        args: [lpAmount],
      })) as any;
    } catch (error) {
      return null;
    }
  },

  async getBalance(vaultAddress: Hex): Promise<bigint | null> {
    try {
      return (await readContract(config, {
        abi: vaultABI,
        address: vaultAddress,
        functionName: "getBalance",
      })) as any;
    } catch (error) {
      return null;
    }
  },

  async getAvailable(vaultAddress: Hex): Promise<bigint | null> {
    try {
      return (await readContract(config, {
        abi: vaultABI,
        address: vaultAddress,
        functionName: "getAvailable",
      })) as any;
    } catch (error) {
      return null;
    }
  },

  async getAllocation(
    vaultAddress: Hex,
    strategyAddress: Hex
  ): Promise<bigint | null> {
    try {
      return (await readContract(config, {
        abi: vaultABI,
        address: vaultAddress,
        functionName: "getAllocation",
        args: [strategyAddress],
      })) as any;
    } catch (error) {
      return null;
    }
  },

  async getSummary(
    vaultAddress: Hex
  ): Promise<{ allocated: bigint; idle: bigint } | null> {
    try {
      return (await readContract(config, {
        abi: vaultABI,
        address: vaultAddress,
        functionName: "getAllocation",
      })) as any;
    } catch (error) {
      return null;
    }
  },

  async getStrategies(vaultAddress: Hex): Promise<Hex[] | null> {
    try {
      return (await readContract(config, {
        abi: vaultABI,
        address: vaultAddress,
        functionName: "getStrategies",
      })) as any;
    } catch (error) {
      return null;
    }
  },
};

const AccountFactoryContract = {
  async createAccount(): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: accountFactoryABI,
        address: Provider.AccountFactory,
        functionName: "createAccount",
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async getAccount(ownerAddress: Hex): Promise<Hex | null> {
    try {
      return (await readContract(config, {
        abi: accountFactoryABI,
        address: Provider.AccountFactory,
        functionName: "getAccount",
        args: [ownerAddress],
      })) as any;
    } catch (error) {
      return null;
    }
  },
};

export {
  AgentContract,
  AccountContract,
  VaultContract,
  AccountFactoryContract,
};
