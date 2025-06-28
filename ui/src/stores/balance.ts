import type { Hex } from "viem";
import { defineStore } from "pinia";

export const useBalanceStore = defineStore("balance", {
  state: () => ({
    balances: {
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE": 0,
      "0xf97b6c636167b529b6f1d729bd9bc0e2bd491848": 0,
      "0x0efd8ad2231c0b9c4d63f892e0a0a59a626ce88d": 0,
      "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26": 0,
      "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf": 0,
      "0x676bd5b5d0955925aece653c50426940c58036c8": 0,
    } as { [key: string]: number },
    userBalances: {
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE": 0,
      "0xf97b6c636167b529b6f1d729bd9bc0e2bd491848": 0,
      "0x0efd8ad2231c0b9c4d63f892e0a0a59a626ce88d": 0,
      "0x3a38c4d0444b5ffcc5323b2e86a21abaaf5fbf26": 0,
      "0xcac7ffa82c0f43ebb0fc11fcd32123eca46626cf": 0,
      "0x676bd5b5d0955925aece653c50426940c58036c8": 0,
    } as { [key: string]: number },
  }),
  actions: {
    setBalance(token: Hex, newBalance: number) {
      this.balances[token] = newBalance;
    },
    setUserBalance(token: Hex, newBalance: number) {
      this.userBalances[token] = newBalance;
    },
  },
});
