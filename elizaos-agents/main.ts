import { AgentRuntime, Memory } from "@elizaos/core";
import express from "express";
import { zeroHash } from "viem";
import cors from "cors";
import { AGENTS } from "./src/constants/agent";
import { AppService } from "./src/app.service";
import { StrategyPlugin } from "./src/plugins/strategy";
import { VaultPlugin } from "./src/plugins/vault";
import { AccountPlugin } from "./src/plugins/account";

const app = express();
app.use(cors());
app.use(express.json());

const appService = new AppService();

app.get("/agents", (_: any, res: any) => {
  res.json(appService.getAgents());
});

app.get("/agents/:address", (req: any, res: any) => {
  const agent = appService.getAgent(req.params.address);
  if (!agent) return res.status(404).json({ error: "Agent not found" });
  res.json(agent);
});

app.get("/vaults", (_: any, res: any) => {
  res.json(appService.getVaults());
});

app.get("/vaults/:address", (req: any, res: any) => {
  const vault = appService.getVault(req.params.address);
  if (!vault) return res.status(404).json({ error: "Vault not found" });
  res.json(vault);
});

app.get("/strategies", (_: any, res: any) => {
  res.json(appService.getStrategies());
});

app.get("/strategies/:address", (req: any, res: any) => {
  const strategy = appService.getStrategy(req.params.address);
  if (!strategy) return res.status(404).json({ error: "Strategy not found" });
  res.json(strategy);
});

app.post("/task", async (req: any, res: any) => {
  const agentAddress = req.query.agentAddress;
  const taskType = req.query.taskType;

  const character = AGENTS.find((agent) => agent.address === agentAddress);
  if (!character) return res.status(400).json({ error: "Agent not found" });

  const runtime = new AgentRuntime({
    character,
    plugins: [AccountPlugin, VaultPlugin, StrategyPlugin],
  });

  const text =
    [
      "Look for strategies you might want to add…",
      "Look for strategies you might want to remove…",
      "Would you like to reallocate…?",
    ][Number(taskType)] ?? "Invalid task";

  const replies: Memory[] = [];

  try {
    await runtime.processActions(
      {
        entityId: crypto.randomUUID(),
        roomId: crypto.randomUUID(),
        content: { text },
      },
      replies
    );
  } catch (error) {
    console.log(error);
  }

  console.log(replies);

  res.send(zeroHash);
});

const PORT = process.env.PORT || 4173;

app.listen(PORT, () => {
  console.log("Server running");
});
