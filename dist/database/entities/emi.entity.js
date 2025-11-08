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
exports.EMIEntity = exports.EMIStatus = void 0;
const typeorm_1 = require("typeorm");
const loan_entity_1 = require("./loan.entity");
const user_entity_1 = require("./user.entity");
var EMIStatus;
(function (EMIStatus) {
    EMIStatus["PENDING"] = "pending";
    EMIStatus["PAID"] = "paid";
    EMIStatus["OVERDUE"] = "overdue";
    EMIStatus["PARTIALLY_PAID"] = "partiallyPaid";
})(EMIStatus || (exports.EMIStatus = EMIStatus = {}));
let EMIEntity = class EMIEntity {
    id;
    loanId;
    userId;
    emiNumber;
    emiAmount;
    principalComponent;
    interestComponent;
    dueDate;
    status;
    currency;
    paidAmount;
    paidDate;
    transactionId;
    lateFee;
    notes;
    createdAt;
    updatedAt;
    loan;
    user;
};
exports.EMIEntity = EMIEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EMIEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], EMIEntity.prototype, "loanId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], EMIEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], EMIEntity.prototype, "emiNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], EMIEntity.prototype, "emiAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], EMIEntity.prototype, "principalComponent", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], EMIEntity.prototype, "interestComponent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], EMIEntity.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EMIStatus,
        default: EMIStatus.PENDING,
    }),
    __metadata("design:type", String)
], EMIEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'INR', nullable: true }),
    __metadata("design:type", String)
], EMIEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EMIEntity.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], EMIEntity.prototype, "paidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EMIEntity.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EMIEntity.prototype, "lateFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EMIEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EMIEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EMIEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => loan_entity_1.LoanEntity, (loan) => loan.emis, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'loanId' }),
    __metadata("design:type", loan_entity_1.LoanEntity)
], EMIEntity.prototype, "loan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], EMIEntity.prototype, "user", void 0);
exports.EMIEntity = EMIEntity = __decorate([
    (0, typeorm_1.Entity)('emis')
], EMIEntity);
//# sourceMappingURL=emi.entity.js.map