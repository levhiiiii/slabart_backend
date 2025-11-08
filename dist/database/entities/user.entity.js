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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const salary_entity_1 = require("./salary.entity");
const expense_entity_1 = require("./expense.entity");
const loan_entity_1 = require("./loan.entity");
const borrow_entity_1 = require("./borrow.entity");
let UserEntity = class UserEntity {
    id;
    email;
    displayName;
    photoUrl;
    phoneNumber;
    isEmailVerified;
    password;
    firebaseUid;
    createdAt;
    updatedAt;
    lastLoginAt;
    salaries;
    expenses;
    loans;
    borrows;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "firebaseUid", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => salary_entity_1.SalaryEntity, (salary) => salary.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "salaries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => expense_entity_1.ExpenseEntity, (expense) => expense.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "expenses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => loan_entity_1.LoanEntity, (loan) => loan.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "loans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => borrow_entity_1.BorrowEntity, (borrow) => borrow.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "borrows", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);
//# sourceMappingURL=user.entity.js.map