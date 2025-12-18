import { Repository } from 'typeorm';
import { SalaryEntity } from '../database/entities/salary.entity';
import { ExpenseEntity } from '../database/entities/expense.entity';
import { LoanEntity } from '../database/entities/loan.entity';
import { BorrowEntity } from '../database/entities/borrow.entity';
import { GoalEntity } from '../database/entities/goal.entity';
import { ExpenseCategoryEntity } from '../database/entities/expense-category.entity';
import { IncomeSourceEntity } from '../database/entities/income-source.entity';
import { UserEntity } from '../database/entities/user.entity';
export interface DashboardSummary {
    balance: {
        total: number;
        income: number;
        expense: number;
    };
    stats: {
        saved: number;
        savedPercentage: number;
        totalBudget: number;
        budgetUsedPercentage: number;
        goalsCompleted: number;
        totalGoals: number;
    };
    spendingByCategory: {
        category: string;
        amount: number;
        percentage: number;
        iconCodePoint?: number;
    }[];
    recentTransactions: {
        id: string;
        title: string;
        category: string;
        amount: number;
        isIncome: boolean;
        date: Date;
        iconCodePoint?: number;
    }[];
    loans: {
        totalOutstanding: number;
        monthlyEmi: number;
        count: number;
    };
    borrowed: {
        totalBorrowed: number;
        totalLent: number;
    };
}
export declare class DashboardService {
    private readonly userRepository;
    private readonly salaryRepository;
    private readonly expenseRepository;
    private readonly loanRepository;
    private readonly borrowRepository;
    private readonly goalRepository;
    private readonly expenseCategoryRepository;
    private readonly incomeSourceRepository;
    constructor(userRepository: Repository<UserEntity>, salaryRepository: Repository<SalaryEntity>, expenseRepository: Repository<ExpenseEntity>, loanRepository: Repository<LoanEntity>, borrowRepository: Repository<BorrowEntity>, goalRepository: Repository<GoalEntity>, expenseCategoryRepository: Repository<ExpenseCategoryEntity>, incomeSourceRepository: Repository<IncomeSourceEntity>);
    getDashboardSummary(userId: string): Promise<DashboardSummary>;
    private formatCategoryName;
    private getCategoryIconCodePoint;
}
