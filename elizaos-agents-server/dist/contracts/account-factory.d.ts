import type { Hex } from "viem";
declare class AccountFactory {
    getAccount(owner: Hex): Promise<Hex | null>;
}
export { AccountFactory };
