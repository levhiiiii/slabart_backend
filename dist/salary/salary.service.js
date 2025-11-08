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
exports.SalaryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const salary_entity_1 = require("../database/entities/salary.entity");
let SalaryService = class SalaryService {
    salaryRepository;
    constructor(salaryRepository) {
        this.salaryRepository = salaryRepository;
    }
    async findAll(userId) {
        return this.salaryRepository.find({
            where: { userId },
            order: { paymentDate: 'DESC' },
        });
    }
    async findOne(id, userId) {
        return this.salaryRepository.findOne({
            where: { id, userId },
        });
    }
    async create(data, userId) {
        const salary = this.salaryRepository.create({
            ...data,
            userId,
        });
        return this.salaryRepository.save(salary);
    }
    async update(id, data, userId) {
        await this.salaryRepository.update({ id, userId }, data);
        return this.findOne(id, userId);
    }
    async delete(id, userId) {
        await this.salaryRepository.delete({ id, userId });
        return { deleted: true };
    }
};
exports.SalaryService = SalaryService;
exports.SalaryService = SalaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(salary_entity_1.SalaryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SalaryService);
//# sourceMappingURL=salary.service.js.map