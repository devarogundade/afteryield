import { Service } from "@elizaos/core";
export declare class AccountService extends Service {
    static serviceType: string;
    capabilityDescription: string;
    lookupAccount(userAddress: string): Promise<string | null>;
    stop(): Promise<void>;
}
