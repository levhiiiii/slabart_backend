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
exports.BorrowEntity = exports.BorrowStatus = exports.BorrowType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var BorrowType;
(function (BorrowType) {
    BorrowType["BORROWED"] = "borrowed";
    BorrowType["LENT"] = "lent";
})(BorrowType || (exports.BorrowType = BorrowType = {}));
var BorrowStatus;
(function (BorrowStatus) {
    BorrowStatus["ACTIVE"] = "active";
    BorrowStatus["SETTLED"] = "settled";
    BorrowStatus["PARTIALLY_SETTLED"] = "partiallySettled";
    BorrowStatus["OVERDUE"] = "overdue";
})(BorrowStatus || (exports.BorrowStatus = BorrowStatus = {}));
let BorrowEntity = class BorrowEntity {
    id;
    userId;
    amount;
    currency;
    type;
    status;
    date;
    personName;
    personContact;
    personEmail;
    description;
    dueDate;
    interestRate;
    settledAmount;
    settledDate;
    reminderDates;
    paymentHistory;
    createdAt;
    updatedAt;
    user;
};
exports.BorrowEntity = BorrowEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BorrowEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], BorrowEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BorrowEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'INR' }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BorrowType,
        default: BorrowType.BORROWED,
    }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BorrowStatus,
        default: BorrowStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], BorrowEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BorrowEntity.prototype, "personName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "personContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "personEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BorrowEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], BorrowEntity.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], BorrowEntity.prototype, "interestRate", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BorrowEntity.prototype, "settledAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], BorrowEntity.prototype, "settledDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], BorrowEntity.prototype, "reminderDates", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], BorrowEntity.prototype, "paymentHistory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BorrowEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BorrowEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.borrows, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], BorrowEntity.prototype, "user", void 0);
exports.BorrowEntity = BorrowEntity = __decorate([
    (0, typeorm_1.Entity)('borrows')
], BorrowEntity);
//# sourceMappingURL=borrow.entity.js.map