import type { Hex } from "viem";
import { defineStore } from "pinia";

export const useWalletStore = defineStore("wallet", {
  state: () => ({
    address: null as Hex | null,
  }),
  actions: {
    setAddress(newAddress: Hex | null) {
      this.address = newAddress;
    },
  },
});
