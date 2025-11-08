import { SalaryService } from './salary.service';
export declare class SalaryController {
    private readonly salaryService;
    constructor(salaryService: SalaryService);
    findAll(req: any): Promise<import("../database/entities/salary.entity").SalaryEntity[]>;
    findOne(id: string, req: any): Promise<import("../database/entities/salary.entity").SalaryEntity | null>;
    create(data: any, req: any): Promise<import("../database/entities/salary.entity").SalaryEntity>;
    update(id: string, data: any, req: any): Promise<import("../database/entities/salary.entity").SalaryEntity | null>;
    delete(id: string, req: any): Promise<{
        deleted: boolean;
    }>;
}
