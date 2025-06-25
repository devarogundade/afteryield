import { WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { AfterYieldAgent } from "src/types";
import { Hex } from "viem";
declare class AccountWorker extends WorkerHost {
    constructor();
    process(job: Job<{
        userAddress: Hex;
        agent: AfterYieldAgent;
    }>): Promise<string>;
    onCompleted(): void;
}
export default AccountWorker;
