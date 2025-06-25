import { Processor, WorkerHost, OnWorkerEvent } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { AfterYieldAgent } from "src/types";
import { Hex } from "viem";

@Processor("AccountWorker")
class AccountWorker extends WorkerHost {
  constructor() {
    super();
  }

  async process(
    job: Job<{ userAddress: Hex; agent: AfterYieldAgent }>
  ): Promise<string> {
    const options = job.data;

    return "";
  }

  @OnWorkerEvent("completed")
  onCompleted() {}
}

export default AccountWorker;
