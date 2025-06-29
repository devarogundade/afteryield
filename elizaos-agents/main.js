"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@elizaos/core");
var express_1 = require("express");
var cors_1 = require("cors");
var agent_1 = require("./src/constants/agent");
var app_service_1 = require("./src/app.service");
var strategy_1 = require("./src/plugins/strategy");
var vault_1 = require("./src/plugins/vault");
var account_1 = require("./src/plugins/account");
var replies_1 = require("./src/constants/replies");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var appService = new app_service_1.AppService();
app.get("/agents", function (_, res) {
    res.json(appService.getAgents());
});
app.get("/agents/:address", function (req, res) {
    var agent = appService.getAgent(req.params.address);
    if (!agent)
        return res.status(404).json({ error: "Agent not found" });
    res.json(agent);
});
app.get("/vaults", function (_, res) {
    res.json(appService.getVaults());
});
app.get("/vaults/:address", function (req, res) {
    var vault = appService.getVault(req.params.address);
    if (!vault)
        return res.status(404).json({ error: "Vault not found" });
    res.json(vault);
});
app.get("/strategies", function (_, res) {
    res.json(appService.getStrategies());
});
app.get("/strategies/:address", function (req, res) {
    var strategy = appService.getStrategy(req.params.address);
    if (!strategy)
        return res.status(404).json({ error: "Strategy not found" });
    res.json(strategy);
});
app.post("/task", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agentAddress, taskType, character, runtime, text, replies, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                agentAddress = req.query.agentAddress;
                taskType = req.query.taskType;
                character = agent_1.AGENTS.find(function (agent) { return agent.address === agentAddress; });
                if (!character)
                    return [2 /*return*/, res.status(400).json({ error: "Agent not found" })];
                runtime = new core_1.AgentRuntime({
                    character: character,
                    plugins: [account_1.AccountPlugin, vault_1.VaultPlugin, strategy_1.StrategyPlugin],
                });
                text = (_a = [
                    "Look for strategies you might want to add…",
                    "Look for strategies you might want to remove…",
                    "Would you like to reallocate…?",
                ][Number(taskType)]) !== null && _a !== void 0 ? _a : "Invalid task";
                return [4 /*yield*/, (0, replies_1.defaultReplies)(character, taskType)];
            case 1:
                replies = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, runtime.processActions({
                        entityId: crypto.randomUUID(),
                        roomId: crypto.randomUUID(),
                        content: { text: text },
                    }, replies)];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 5];
            case 5:
                res.send(replies[0].content.text);
                return [2 /*return*/];
        }
    });
}); });
var PORT = process.env.PORT || 4173;
app.listen(PORT, function () {
    console.log("Server running");
});
