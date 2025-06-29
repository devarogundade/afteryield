import { Hex, zeroAddress, zeroHash } from "viem";
import { AfterYieldAgent } from "../types";
import { Vault } from "../contracts/vault";
import { Memory } from "@elizaos/core";

const defaultReplies = async (
  agent: AfterYieldAgent,
  taskType: number
): Promise<Memory[]> => {
  const vault = new Vault(agent.vaults[0].address);

  let bytes = zeroHash as Hex;
  const existingStrategies = await vault.getStrategies();

  if (taskType == 0) {
    if (existingStrategies.length === 0) {
      bytes = vault.addStrategy(agent.vaults[0].address);
    } else {
      bytes = vault.addStrategy(zeroAddress);
    }
  } else if (taskType == 1) {
    if (existingStrategies.length > 0) {
      bytes = vault.removeStrategy(agent.vaults[0].address);
    } else {
      bytes = vault.removeStrategy(zeroAddress);
    }
  } else {
    if (existingStrategies.length === 0) {
      bytes = vault.reallocate([]);
    } else {
      bytes = vault.reallocate(
        existingStrategies.map(() =>
          BigInt(
            Number(
              (Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000) /
                existingStrategies.length
            ).toFixed(0)
          )
        )
      );
    }
  }

  return [
    {
      entityId: crypto.randomUUID(),
      content: { text: bytes },
      roomId: crypto.randomUUID(),
    },
  ];
};

export { defaultReplies };
