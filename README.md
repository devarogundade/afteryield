# **AfterYield** - (Avalanche Fuji, Chainlink Functions, Chainlink Automation, Chainlink Datafeeds, ElizaOS)

## **Introduction**

AfterYield is a DeFi protocol that brings AI workflows directly on-chain. It enables intelligent, autonomous yield optimization by integrating Chainlink Automation with ElizaOS agents. Our approach reduces human intervention in DeFi strategy execution by leveraging programmable and reactive agents.

---

## **Technical Overview**

We leverage **Chainlink Automation** to manage our agent contracts using **time-based upkeeps**. For each upkeep, the automation system passes a `taskType` (as a number or enum) to the agent contract.

The agent then calls the **Chainlink Functions protocol contract**, supplying metadata about itself and the task. This triggers an **off-chain HTTP POST request** to the ElizaOS Agent Node. The node performs reasoning and returns a **bytes-encoded response** back to Chainlink Functions.

In the on-chain **callback function**, the encoded response is decoded and the appropriate action is executed autonomously by the agent contract.

#### **Workflow Diagram**

![AfterYield drawio](https://github.com/user-attachments/assets/6a5accee-c909-4a02-b056-642279534c5b)

AfterYield ElizaOS Agents is deployed at https://afteryield.onrender.com

---

## **Vault**

A **Vault** manages capital allocations and DeFi strategies. It serves as the execution layer for automated investment decisions, rebalancing funds based on agent instructions.

[View in code](https://github.com/devarogundade/afteryield/tree/main/smart_contracts/contracts/VaultUpgradeable.sol)
[Mock Vault](https://github.com/devarogundade/afteryield/tree/main/smart_contracts/contracts/mocks/SimpleVault.sol)

---

## **Strategy**

A **Strategy** is a modular logic unit built to maximize yield from specific DeFi pools. Strategies can be added, updated, or removed from Vaults to optimize returns based on current market conditions.

[View in code](https://github.com/devarogundade/afteryield/tree/main/smart_contracts/contracts/strategies)

---

## **Agent**

An **Agent** orchestrates Vaults and their Strategies. It can also manage a user's Account, but **only with explicit approval from the account owner**. Agents think, plan, and act autonomously through AI-powered reasoning integrated with Chainlink Functions and ElizaOS.

[View in code](https://github.com/devarogundade/afteryield/tree/main/smart_contracts/contracts/Agent.sol)
[ElizaOS Agents](https://github.com/devarogundade/afteryield/blob/main/elizaos-agents/src/constants/agent.ts)
---

## **Account**

The **Account** is a fully on-chain, user-controlled smart wallet. It allows users to maintain complete ownership of their assets while interacting with autonomous agents.

Agents are granted **explicit permission** to:

* Allocate funds from the Account into one of their managed **Vaults**
* Transfer funds **from a Vault back to the Account**

This permissioned structure ensures secure delegation of control, enabling agents to execute intelligent capital strategies while preserving user sovereignty.

[View in code](https://github.com/devarogundade/afteryield/tree/main/smart_contracts/contracts/protocol/Account.sol)

#### **Afteryield ElizaOS Agents Postman JSON**

```json
{
	"info": {
		"_postman_id": "628e7c91-b755-4bb0-aa29-d0b48bf702fd",
		"name": "AfterYield",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "15409498"
	},
	"item": [
		{
			"name": "Task Upkeep",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [],
				"url": {
					"raw": "https://afteryield.onrender.com/task?agentAddress={{agentAddress}}&taskType={{taskType}}",
					"protocol": "https",
					"host": [
						"afteryield",
						"onrender",
						"com"
					],
					"path": [
						"task"
					],
					"query": [
						{
							"key": "agentAddress",
							"value": "{{agentAddress}}"
						},
						{
							"key": "taskType",
							"value": "{{taskType}}"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Single Vault",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://afteryield.onrender.com/vaults/{{vaultAddress}}",
					"protocol": "https",
					"host": [
						"afteryield",
						"onrender",
						"com"
					],
					"path": [
						"vaults",
						"{{vaultAddress}}"
					]
				}
			},
			"response": []
		},
		{
			"name": "Vaults",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://afteryield.onrender.com/vaults",
					"protocol": "https",
					"host": [
						"afteryield",
						"onrender",
						"com"
					],
					"path": [
						"vaults"
					]
				}
			},
			"response": []
		},
		{
			"name": "Single Agent",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://afteryield.onrender.com/agents/{{agentAddress}}",
					"protocol": "https",
					"host": [
						"afteryield",
						"onrender",
						"com"
					],
					"path": [
						"agents",
						"{{agentAddress}}"
					]
				}
			},
			"response": []
		},
		{
			"name": "Agents",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://afteryield.onrender.com/agents",
					"protocol": "https",
					"host": [
						"afteryield",
						"onrender",
						"com"
					],
					"path": [
						"agents"
					]
				}
			},
			"response": []
		}
	]
}
```
