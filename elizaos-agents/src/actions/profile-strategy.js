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
exports.profileStrategy = void 0;
var strategy_1 = require("../services/strategy");
exports.profileStrategy = {
    name: "profileStrategy",
    description: "Gathers on-chain stats for a strategy (vault, asset, balances, allocation).",
    similes: ["PROFILE_STRATEGY"],
    examples: [
        [
            {
                name: "{{user}}",
                content: {
                    text: "profileStrategy 0xStrategyAddress",
                },
            },
        ],
    ],
    validate: function (_rt, message) { return __awaiter(void 0, void 0, void 0, function () {
        var t;
        var _a;
        return __generator(this, function (_b) {
            t = (_a = message.content) === null || _a === void 0 ? void 0 : _a.text;
            return [2 /*return*/, /^profileStrategy\s+0x[a-fA-F0-9]{40}$/.test(t)];
        });
    }); },
    handler: function (runtime, message, _state, _opts, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var txt, m, stratAddr, svc, data, err_1, vault, asset, balance, balanceAsset, balancePool, allocation, textLines;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    txt = (_a = message.content) === null || _a === void 0 ? void 0 : _a.text;
                    m = txt.match(/(0x[a-fA-F0-9]{40})$/);
                    if (!m) {
                        callback === null || callback === void 0 ? void 0 : callback({
                            text: "Usage: profileStrategy <strategyAddress> (e.g. 0x123...abc)",
                        });
                        return [2 /*return*/, false];
                    }
                    stratAddr = m[1];
                    svc = runtime.getService(strategy_1.StrategyService.serviceType);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, svc.profile(stratAddr)];
                case 2:
                    data = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    // runtime.log()
                    callback === null || callback === void 0 ? void 0 : callback({
                        text: "Error profiling strategy—check logs for details.",
                    });
                    return [2 /*return*/, false];
                case 4:
                    vault = data.vault, asset = data.asset, balance = data.balance, balanceAsset = data.balanceAsset, balancePool = data.balancePool, allocation = data.allocation;
                    textLines = [
                        "Strategy Profile for ".concat(stratAddr),
                        "Vault: ".concat(vault !== null && vault !== void 0 ? vault : "None"),
                        "Asset: ".concat(asset),
                        "Agent Balance: ".concat(balance),
                        "Asset-value Balance: ".concat(balanceAsset),
                        "Pool Balance: ".concat(balancePool),
                        "Allocation in Vault: ".concat(allocation),
                    ];
                    callback === null || callback === void 0 ? void 0 : callback({
                        text: textLines.join("\n"),
                        content: data,
                    });
                    return [2 /*return*/, true];
            }
        });
    }); },
};
