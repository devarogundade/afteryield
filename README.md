# **AfterYield**

## **Introduction**

AfterYield is a DeFi protocol that brings AI workflows directly on-chain. It enables intelligent, autonomous yield optimization by integrating Chainlink Automation with ElizaOS agents. Our approach reduces human intervention in DeFi strategy execution by leveraging programmable and reactive agents.

---

## **Technical Overview**

We leverage **Chainlink Automation** to manage our agent contracts using **time-based upkeeps**. For each upkeep, the automation system passes a `taskType` (as a number or enum) to the agent contract.

The agent then calls the **Chainlink Functions protocol contract**, supplying metadata about itself and the task. This triggers an **off-chain HTTP POST request** to the ElizaOS Agent Node. The node performs reasoning and returns a **bytes-encoded response** back to Chainlink Functions.

In the on-chain **callback function**, the encoded response is decoded and the appropriate action is executed autonomously by the agent contract.

---

## **Workflow Diagram**

![AfterYield drawio](https://github.com/user-attachments/assets/6a5accee-c909-4a02-b056-642279534c5b)
