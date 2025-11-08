"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./entities/user.entity");
const salary_entity_1 = require("./entities/salary.entity");
const expense_entity_1 = require("./entities/expense.entity");
const loan_entity_1 = require("./entities/loan.entity");
const emi_entity_1 = require("./entities/emi.entity");
const borrow_entity_1 = require("./entities/borrow.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [
                        user_entity_1.UserEntity,
                        salary_entity_1.SalaryEntity,
                        expense_entity_1.ExpenseEntity,
                        loan_entity_1.LoanEntity,
                        emi_entity_1.EMIEntity,
                        borrow_entity_1.BorrowEntity,
                    ],
                    synchronize: true,
                    ssl: configService.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
                    logging: configService.get('NODE_ENV') === 'development',
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map