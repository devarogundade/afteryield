"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@elizaos/core");
const bullmq_1 = require("@nestjs/bullmq");
const account_1 = require("../plugins/account");
const strategy_1 = require("../plugins/strategy");
const vault_1 = require("../plugins/vault");
let VaultWorker = class VaultWorker extends bullmq_1.WorkerHost {
    constructor() {
        super();
    }
    async process(job) {
        const character = job.data;
        const agent = new core_1.AgentRuntime({
            character,
            plugins: [account_1.AccountPlugin, vault_1.VaultPlugin, strategy_1.StrategyPlugin],
        });
        await agent.initialize();
        const responses = [];
        await agent.processActions({
            roomId: "a-b-c-d-e",
            entityId: "1-2-3-4-5",
            content: {
                text: "What is the account address of 0xB84E17b2ACF54Ab0aF587786be33E3370Cc5D524",
            },
        }, responses);
        console.log(responses);
        return responses.map((r) => r.content.text).join("\n");
    }
    onCompleted() { }
};
__decorate([
    (0, bullmq_1.OnWorkerEvent)("completed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VaultWorker.prototype, "onCompleted", null);
VaultWorker = __decorate([
    (0, bullmq_1.Processor)("VaultWorker"),
    __metadata("design:paramtypes", [])
], VaultWorker);
exports.default = VaultWorker;
//# sourceMappingURL=vault-worker.js.map