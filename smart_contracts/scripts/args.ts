import { encodeAbiParameters, Hex } from "viem";

function main(taskType: number, subscriptionId: bigint, gasLimit: number): Hex {
  return encodeAbiParameters(
    [
      { type: "uint8", name: "taskType" },
      { type: "uint64", name: "subscriptionId" },
      { type: "uint32", name: "gasLimit" },
    ],
    [taskType, subscriptionId, gasLimit]
  );
}

console.log("ADD STRATEGY", main(0, BigInt(15694), 500000));
console.log("REMOVE STRATEGY", main(1, BigInt(15694), 500000));
console.log("REALLOCATION STRATEGY", main(2, BigInt(15694), 500000));
