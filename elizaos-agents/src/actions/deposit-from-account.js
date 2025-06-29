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
exports.depositFromAccount = void 0;
var vault_1 = require("../services/vault");
exports.depositFromAccount = {
    name: "depositFromAccount",
    description: "Deposits a scaled amount from a user account into the given vault.",
    similes: ["DEPOSIT_VAULT", "DEPOSIT_FROM_ACCOUNT"],
    examples: [
        [
            {
                name: "{{user}}",
                content: {
                    text: "depositFromAccount 0xVaultAddr 1000000000000000000 0xMyAccount",
                },
            },
        ],
    ],
    validate: function (_runtime, message) { return __awaiter(void 0, void 0, void 0, function () {
        var txt;
        var _a;
        return __generator(this, function (_b) {
            txt = (_a = message.content) === null || _a === void 0 ? void 0 : _a.text;
            return [2 /*return*/, /^depositFromAccount\s+0x[a-fA-F0-9]{40}\s+\d+\s+0x[a-fA-F0-9]{40}$/.test(txt)];
        });
    }); },
    handler: function (runtime, message, _state, _opts, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var t, m, _, vaultAddress, amountStr, account, svc, amountScaled, bytesResponse, text;
        var _a;
        return __generator(this, function (_b) {
            t = (_a = message.content) === null || _a === void 0 ? void 0 : _a.text;
            m = t.match(/^depositFromAccount\s+(0x[a-fA-F0-9]{40})\s+(\d+)\s+(0x[a-fA-F0-9]{40})$/) || [];
            if (!m) {
                callback === null || callback === void 0 ? void 0 : callback({
                    text: "Usage: depositFromAccount <vaultAddress> <amountScaled> <accountAddress>",
                });
                return [2 /*return*/, false];
            }
            _ = m[0], vaultAddress = m[1], amountStr = m[2], account = m[3];
            svc = runtime.getService(vault_1.VaultService.serviceType);
            amountScaled = BigInt(amountStr);
            bytesResponse = svc.deposit(vaultAddress, amountScaled, account);
            text = "Bytes response is ".concat(bytesResponse);
            callback === null || callback === void 0 ? void 0 : callback({
                text: text,
                content: { vaultAddress: vaultAddress, amountScaled: amountScaled, account: account, bytesResponse: bytesResponse },
            });
            return [2 /*return*/, true];
        });
    }); },
};
