import { WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { AfterYieldAgent } from "src/types";
declare class VaultWorker extends WorkerHost {
    constructor();
    process(job: Job<AfterYieldAgent>): Promise<string>;
    onCompleted(): void;
}
export default VaultWorker;
