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
exports.LoanEntity = exports.LoanStatus = exports.LoanType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const emi_entity_1 = require("./emi.entity");
var LoanType;
(function (LoanType) {
    LoanType["PERSONAL"] = "personal";
    LoanType["HOME"] = "home";
    LoanType["CAR"] = "car";
    LoanType["EDUCATION"] = "education";
    LoanType["BUSINESS"] = "business";
    LoanType["OTHER"] = "other";
})(LoanType || (exports.LoanType = LoanType = {}));
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["ACTIVE"] = "active";
    LoanStatus["PAID"] = "paid";
    LoanStatus["DEFAULTED"] = "defaulted";
    LoanStatus["CLOSED"] = "closed";
})(LoanStatus || (exports.LoanStatus = LoanStatus = {}));
let LoanEntity = class LoanEntity {
    id;
    userId;
    principalAmount;
    interestRate;
    tenureMonths;
    startDate;
    loanType;
    status;
    currency;
    lenderName;
    lenderContact;
    description;
    processingFee;
    prepaymentCharges;
    paidAmount;
    lastPaymentDate;
    nextPaymentDate;
    createdAt;
    updatedAt;
    user;
    emis;
};
exports.LoanEntity = LoanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LoanEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], LoanEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "principalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "interestRate", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], LoanEntity.prototype, "tenureMonths", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], LoanEntity.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LoanType,
        default: LoanType.PERSONAL,
    }),
    __metadata("design:type", String)
], LoanEntity.prototype, "loanType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LoanStatus,
        default: LoanStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], LoanEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'INR' }),
    __metadata("design:type", String)
], LoanEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LoanEntity.prototype, "lenderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LoanEntity.prototype, "lenderContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LoanEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "processingFee", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "prepaymentCharges", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LoanEntity.prototype, "lastPaymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LoanEntity.prototype, "nextPaymentDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LoanEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LoanEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.loans, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], LoanEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => emi_entity_1.EMIEntity, (emi) => emi.loan),
    __metadata("design:type", Array)
], LoanEntity.prototype, "emis", void 0);
exports.LoanEntity = LoanEntity = __decorate([
    (0, typeorm_1.Entity)('loans')
], LoanEntity);
//# sourceMappingURL=loan.entity.js.map