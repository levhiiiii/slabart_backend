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
exports.ExpenseEntity = exports.ExpenseCategory = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory["FOOD"] = "food";
    ExpenseCategory["TRANSPORT"] = "transport";
    ExpenseCategory["SHOPPING"] = "shopping";
    ExpenseCategory["ENTERTAINMENT"] = "entertainment";
    ExpenseCategory["BILLS"] = "bills";
    ExpenseCategory["HEALTH"] = "health";
    ExpenseCategory["EDUCATION"] = "education";
    ExpenseCategory["TRAVEL"] = "travel";
    ExpenseCategory["INVESTMENT"] = "investment";
    ExpenseCategory["OTHER"] = "other";
})(ExpenseCategory || (exports.ExpenseCategory = ExpenseCategory = {}));
let ExpenseEntity = class ExpenseEntity {
    id;
    userId;
    amount;
    currency;
    date;
    category;
    description;
    merchant;
    paymentMethod;
    receipt;
    metadata;
    createdAt;
    updatedAt;
    user;
};
exports.ExpenseEntity = ExpenseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ExpenseEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'INR' }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ExpenseEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ExpenseCategory,
        default: ExpenseCategory.OTHER,
    }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "receipt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ExpenseEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ExpenseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ExpenseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.expenses, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ExpenseEntity.prototype, "user", void 0);
exports.ExpenseEntity = ExpenseEntity = __decorate([
    (0, typeorm_1.Entity)('expenses')
], ExpenseEntity);
//# sourceMappingURL=expense.entity.js.map