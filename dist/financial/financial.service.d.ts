import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { IncomeSourceEntity } from '../database/entities/income-source.entity';
import { LoanEntity } from '../database/entities/loan.entity';
import { BorrowEntity } from '../database/entities/borrow.entity';
import { GoalEntity } from '../database/entities/goal.entity';
import { ExpenseCategoryEntity } from '../database/entities/expense-category.entity';
export declare class FinancialService {
    private readonly userRepository;
    private readonly incomeSourceRepository;
    private readonly loanRepository;
    private readonly borrowRepository;
    private readonly goalRepository;
    private readonly expenseCategoryRepository;
    constructor(userRepository: Repository<UserEntity>, incomeSourceRepository: Repository<IncomeSourceEntity>, loanRepository: Repository<LoanEntity>, borrowRepository: Repository<BorrowEntity>, goalRepository: Repository<GoalEntity>, expenseCategoryRepository: Repository<ExpenseCategoryEntity>);
    saveSalary(data: any, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    saveIncomeSources(data: any, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    saveLoans(data: any, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    saveBorrowed(data: any, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    saveGoals(data: any, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    saveExpenseCategories(data: any, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    saveAllSetupData(data: any, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    completeSetup(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getSetupData(userId: string): Promise<{
        monthlySalary: number | undefined;
        salaryDate: number | undefined;
        isSetupComplete: boolean | undefined;
        incomeSources: IncomeSourceEntity[];
        loansAndEmis: LoanEntity[];
        borrowed: BorrowEntity[];
        goals: GoalEntity[];
        expenseCategories: ExpenseCategoryEntity[];
    }>;
    private mapLoanType;
    private mapGoalPriority;
    private getNextPaymentDate;
}
