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
exports.FinancialController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const financial_service_1 = require("./financial.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let FinancialController = class FinancialController {
    financialService;
    constructor(financialService) {
        this.financialService = financialService;
    }
    async saveSalary(data, req) {
        return this.financialService.saveSalary(data, req.user.sub);
    }
    async saveIncomeSources(data, req) {
        return this.financialService.saveIncomeSources(data, req.user.sub);
    }
    async saveLoans(data, req) {
        return this.financialService.saveLoans(data, req.user.sub);
    }
    async saveBorrowed(data, req) {
        return this.financialService.saveBorrowed(data, req.user.sub);
    }
    async saveGoals(data, req) {
        return this.financialService.saveGoals(data, req.user.sub);
    }
    async saveExpenseCategories(data, req) {
        return this.financialService.saveExpenseCategories(data, req.user.sub);
    }
    async saveAllSetupData(data, req) {
        return this.financialService.saveAllSetupData(data, req.user.sub);
    }
    async completeSetup(req) {
        return this.financialService.completeSetup(req.user.sub);
    }
    async getSetupData(req) {
        return this.financialService.getSetupData(req.user.sub);
    }
};
exports.FinancialController = FinancialController;
__decorate([
    (0, common_1.Post)('salary'),
    (0, swagger_1.ApiOperation)({ summary: 'Save salary data during onboarding' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "saveSalary", null);
__decorate([
    (0, common_1.Post)('income-sources'),
    (0, swagger_1.ApiOperation)({ summary: 'Save income sources during onboarding' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "saveIncomeSources", null);
__decorate([
    (0, common_1.Post)('loans'),
    (0, swagger_1.ApiOperation)({ summary: 'Save loans/EMI data during onboarding' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "saveLoans", null);
__decorate([
    (0, common_1.Post)('borrowed'),
    (0, swagger_1.ApiOperation)({ summary: 'Save borrowed/lent data during onboarding' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "saveBorrowed", null);
__decorate([
    (0, common_1.Post)('goals'),
    (0, swagger_1.ApiOperation)({ summary: 'Save financial goals during onboarding' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "saveGoals", null);
__decorate([
    (0, common_1.Post)('expense-categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Save expense categories during onboarding' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "saveExpenseCategories", null);
__decorate([
    (0, common_1.Post)('setup'),
    (0, swagger_1.ApiOperation)({ summary: 'Save all financial setup data at once' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "saveAllSetupData", null);
__decorate([
    (0, common_1.Post)('setup/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark financial setup as complete' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "completeSetup", null);
__decorate([
    (0, common_1.Get)('setup'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all financial setup data' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "getSetupData", null);
exports.FinancialController = FinancialController = __decorate([
    (0, swagger_1.ApiTags)('Financial Setup'),
    (0, common_1.Controller)('financial'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [financial_service_1.FinancialService])
], FinancialController);
//# sourceMappingURL=financial.controller.js.map