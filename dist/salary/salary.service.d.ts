import { Repository } from 'typeorm';
import { SalaryEntity } from '../database/entities/salary.entity';
export declare class SalaryService {
    private readonly salaryRepository;
    constructor(salaryRepository: Repository<SalaryEntity>);
    findAll(userId: string): Promise<SalaryEntity[]>;
    findOne(id: string, userId: string): Promise<SalaryEntity | null>;
    create(data: Partial<SalaryEntity>, userId: string): Promise<SalaryEntity>;
    update(id: string, data: Partial<SalaryEntity>, userId: string): Promise<SalaryEntity | null>;
    delete(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
}
