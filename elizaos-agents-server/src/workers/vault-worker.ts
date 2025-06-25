import { AgentRuntime, Memory } from "@elizaos/core";
import { Processor, WorkerHost, OnWorkerEvent } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { AccountPlugin } from "src/plugins/account";
import { StrategyPlugin } from "src/plugins/strategy";
import { VaultPlugin } from "src/plugins/vault";
import { AfterYieldAgent } from "src/types";

@Processor("VaultWorker")
class VaultWorker extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job<AfterYieldAgent>): Promise<string> {
    const character = job.data;

    const agent = new AgentRuntime({
      character,
      plugins: [AccountPlugin, VaultPlugin, StrategyPlugin],
    });

    await agent.initialize();

    const responses: Memory[] = [];

    await agent.processActions(
      {
        roomId: "a-b-c-d-e",
        entityId: "1-2-3-4-5",
        content: {
          text: "What is the account address of 0xB84E17b2ACF54Ab0aF587786be33E3370Cc5D524",
        },
      },
      responses
    );

    console.log(responses);

    return responses.map((r) => r.content.text).join("\n");
  }

  @OnWorkerEvent("completed")
  onCompleted() {}
}

export default VaultWorker;
