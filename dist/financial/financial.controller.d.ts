import { FinancialService } from './financial.service';
export declare class FinancialController {
    private readonly financialService;
    constructor(financialService: FinancialService);
    saveSalary(data: any, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    saveIncomeSources(data: any, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    saveLoans(data: any, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    saveBorrowed(data: any, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    saveGoals(data: any, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    saveExpenseCategories(data: any, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    saveAllSetupData(data: any, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    completeSetup(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getSetupData(req: any): Promise<{
        monthlySalary: number | undefined;
        salaryDate: number | undefined;
        isSetupComplete: boolean | undefined;
        incomeSources: import("../database/entities/income-source.entity").IncomeSourceEntity[];
        loansAndEmis: import("../database/entities/loan.entity").LoanEntity[];
        borrowed: import("../database/entities/borrow.entity").BorrowEntity[];
        goals: import("../database/entities/goal.entity").GoalEntity[];
        expenseCategories: import("../database/entities/expense-category.entity").ExpenseCategoryEntity[];
    }>;
}
