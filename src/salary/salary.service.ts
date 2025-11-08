import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalaryEntity } from '../database/entities/salary.entity';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(SalaryEntity)
    private readonly salaryRepository: Repository<SalaryEntity>,
  ) {}

  async findAll(userId: string) {
    return this.salaryRepository.find({
      where: { userId },
      order: { paymentDate: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    return this.salaryRepository.findOne({
      where: { id, userId },
    });
  }

  async create(data: Partial<SalaryEntity>, userId: string) {
    const salary = this.salaryRepository.create({
      ...data,
      userId,
    });
    return this.salaryRepository.save(salary);
  }

  async update(id: string, data: Partial<SalaryEntity>, userId: string) {
    await this.salaryRepository.update({ id, userId }, data);
    return this.findOne(id, userId);
  }

  async delete(id: string, userId: string) {
    await this.salaryRepository.delete({ id, userId });
    return { deleted: true };
  }
}
