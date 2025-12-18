"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const salary_entity_1 = require("../database/entities/salary.entity");
const expense_entity_1 = require("../database/entities/expense.entity");
const loan_entity_1 = require("../database/entities/loan.entity");
const borrow_entity_1 = require("../database/entities/borrow.entity");
const goal_entity_1 = require("../database/entities/goal.entity");
const expense_category_entity_1 = require("../database/entities/expense-category.entity");
const income_source_entity_1 = require("../database/entities/income-source.entity");
const user_entity_1 = require("../database/entities/user.entity");
const auth_module_1 = require("../auth/auth.module");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_controller_1 = require("./dashboard.controller");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                salary_entity_1.SalaryEntity,
                expense_entity_1.ExpenseEntity,
                loan_entity_1.LoanEntity,
                borrow_entity_1.BorrowEntity,
                goal_entity_1.GoalEntity,
                expense_category_entity_1.ExpenseCategoryEntity,
                income_source_entity_1.IncomeSourceEntity,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService],
        exports: [dashboard_service_1.DashboardService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map