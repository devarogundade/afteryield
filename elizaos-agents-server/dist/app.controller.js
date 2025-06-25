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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getAgents() {
        return this.appService.getAgents();
    }
    getAgent(agentAddress) {
        return this.appService.getAgent(agentAddress);
    }
    getVaults() {
        return this.appService.getVaults();
    }
    getVault(vaultAddress) {
        return this.appService.getVault(vaultAddress);
    }
    getStrategies() {
        return this.appService.getStrategies();
    }
    getStrategy(strategyAddress) {
        return this.appService.getStrategy(strategyAddress);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)("/agents"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getAgents", null);
__decorate([
    (0, common_1.Get)("/agents/:address"),
    __param(0, (0, common_1.Param)("address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AppController.prototype, "getAgent", null);
__decorate([
    (0, common_1.Get)("/vaults"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getVaults", null);
__decorate([
    (0, common_1.Get)("/vaults/:address"),
    __param(0, (0, common_1.Param)("address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AppController.prototype, "getVault", null);
__decorate([
    (0, common_1.Get)("/strategies"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getStrategies", null);
__decorate([
    (0, common_1.Get)("/strategies/:address"),
    __param(0, (0, common_1.Param)("address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AppController.prototype, "getStrategy", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map