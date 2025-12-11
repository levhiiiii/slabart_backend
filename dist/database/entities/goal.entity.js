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
exports.GoalEntity = exports.GoalStatus = exports.GoalPriority = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var GoalPriority;
(function (GoalPriority) {
    GoalPriority["LOW"] = "low";
    GoalPriority["MEDIUM"] = "medium";
    GoalPriority["HIGH"] = "high";
})(GoalPriority || (exports.GoalPriority = GoalPriority = {}));
var GoalStatus;
(function (GoalStatus) {
    GoalStatus["ACTIVE"] = "active";
    GoalStatus["COMPLETED"] = "completed";
    GoalStatus["PAUSED"] = "paused";
    GoalStatus["CANCELLED"] = "cancelled";
})(GoalStatus || (exports.GoalStatus = GoalStatus = {}));
let GoalEntity = class GoalEntity {
    id;
    userId;
    name;
    targetAmount;
    savedAmount;
    monthlyContribution;
    currency;
    targetDate;
    icon;
    iconCodePoint;
    notes;
    priority;
    status;
    createdAt;
    updatedAt;
    user;
};
exports.GoalEntity = GoalEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GoalEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], GoalEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GoalEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], GoalEntity.prototype, "targetAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], GoalEntity.prototype, "savedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], GoalEntity.prototype, "monthlyContribution", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'INR' }),
    __metadata("design:type", String)
], GoalEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], GoalEntity.prototype, "targetDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GoalEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], GoalEntity.prototype, "iconCodePoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GoalEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GoalPriority,
        default: GoalPriority.MEDIUM,
    }),
    __metadata("design:type", String)
], GoalEntity.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GoalStatus,
        default: GoalStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], GoalEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], GoalEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], GoalEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.goals, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], GoalEntity.prototype, "user", void 0);
exports.GoalEntity = GoalEntity = __decorate([
    (0, typeorm_1.Entity)('goals')
], GoalEntity);
//# sourceMappingURL=goal.entity.js.map