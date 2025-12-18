import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { SalaryEntity } from '../database/entities/salary.entity';
import { ExpenseEntity } from '../database/entities/expense.entity';
import { LoanEntity, LoanStatus } from '../database/entities/loan.entity';
import { BorrowEntity, BorrowStatus, BorrowType } from '../database/entities/borrow.entity';
import { GoalEntity, GoalStatus } from '../database/entities/goal.entity';
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

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SalaryEntity)
    private readonly salaryRepository: Repository<SalaryEntity>,
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
    @InjectRepository(LoanEntity)
    private readonly loanRepository: Repository<LoanEntity>,
    @InjectRepository(BorrowEntity)
    private readonly borrowRepository: Repository<BorrowEntity>,
    @InjectRepository(GoalEntity)
    private readonly goalRepository: Repository<GoalEntity>,
    @InjectRepository(ExpenseCategoryEntity)
    private readonly expenseCategoryRepository: Repository<ExpenseCategoryEntity>,
    @InjectRepository(IncomeSourceEntity)
    private readonly incomeSourceRepository: Repository<IncomeSourceEntity>,
  ) {}

  async getDashboardSummary(userId: string): Promise<DashboardSummary> {
    // Get current month date range
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Run all queries in parallel for optimal performance
    const [
      user,
      monthlySalaries,
      incomeSources,
      monthlyExpenses,
      allExpenses,
      activeLoans,
      activeBorrows,
      goals,
      expenseCategories,
    ] = await Promise.all([
      // Get user data
      this.userRepository.findOne({ where: { id: userId } }),

      // Get this month's salary entries
      this.salaryRepository.find({
        where: {
          userId,
          paymentDate: Between(startOfMonth, endOfMonth),
          isReceived: true,
        },
      }),

      // Get income sources
      this.incomeSourceRepository.find({ where: { userId } }),

      // Get this month's expenses
      this.expenseRepository.find({
        where: {
          userId,
          date: Between(startOfMonth, endOfMonth),
        },
        order: { date: 'DESC' },
      }),

      // Get all recent expenses for transactions list
      this.expenseRepository.find({
        where: { userId },
        order: { date: 'DESC' },
        take: 10,
      }),

      // Get active loans
      this.loanRepository.find({
        where: { userId, status: LoanStatus.ACTIVE },
      }),

      // Get active borrows
      this.borrowRepository.find({
        where: { userId, status: BorrowStatus.ACTIVE },
      }),

      // Get goals
      this.goalRepository.find({
        where: { userId },
      }),

      // Get expense categories with budgets
      this.expenseCategoryRepository.find({ where: { userId } }),
    ]);

    // Calculate income
    const salaryIncome = monthlySalaries.reduce((sum, s) => sum + Number(s.amount), 0);
    const otherIncome = incomeSources.reduce((sum, s) => sum + Number(s.amount), 0);
    const monthlyIncome = user?.monthlySalary
      ? Number(user.monthlySalary) + otherIncome
      : salaryIncome + otherIncome;

    // Calculate expenses - use actual expenses if available, otherwise use total budget as expected expense
    const actualMonthlyExpense = monthlyExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalBudgetAmount = expenseCategories.reduce((sum, c) => sum + Number(c.monthlyBudget || 0), 0);

    // Debug logging
    console.log('Dashboard Debug:', {
      userId,
      expenseCategoriesCount: expenseCategories.length,
      expenseCategories: expenseCategories.map(c => ({ name: c.name, budget: c.monthlyBudget })),
      totalBudgetAmount,
      actualMonthlyExpense,
      monthlyIncome,
    });

    // If no actual expenses yet, show budget as expected expense (for new users after onboarding)
    const totalMonthlyExpense = actualMonthlyExpense > 0 ? actualMonthlyExpense : totalBudgetAmount;

    // Calculate balance
    const totalBalance = monthlyIncome - totalMonthlyExpense;

    // Calculate saved amount and percentage
    const saved = monthlyIncome - totalMonthlyExpense;
    const savedPercentage = monthlyIncome > 0 ? Math.round((saved / monthlyIncome) * 100) : 0;

    // Calculate budget - use the already calculated totalBudgetAmount
    const totalBudget = totalBudgetAmount;
    // Budget used percentage should be based on actual expenses, not the fallback
    const budgetUsedPercentage = totalBudget > 0 ? Math.round((actualMonthlyExpense / totalBudget) * 100) : 0;

    // Calculate goals progress
    const activeGoals = goals.filter(g => g.status === GoalStatus.ACTIVE || g.status === GoalStatus.COMPLETED);
    const completedGoals = goals.filter(g => g.status === GoalStatus.COMPLETED).length;

    // Calculate spending by category from actual expenses
    const categorySpending = new Map<string, number>();
    monthlyExpenses.forEach(expense => {
      const category = expense.category || 'other';
      categorySpending.set(category, (categorySpending.get(category) || 0) + Number(expense.amount));
    });

    let spendingByCategory = Array.from(categorySpending.entries())
      .map(([category, amount]) => ({
        category: this.formatCategoryName(category),
        amount,
        percentage: totalMonthlyExpense > 0 ? Math.round((amount / totalMonthlyExpense) * 100) : 0,
        iconCodePoint: this.getCategoryIconCodePoint(category),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // If no actual expenses, show budget categories from onboarding
    if (spendingByCategory.length === 0 && expenseCategories.length > 0) {
      // Show all categories (with or without budget) - sorted by budget amount
      // Note: totalBudgetAmount is already calculated above
      spendingByCategory = expenseCategories
        .map(c => ({
          category: c.name || 'Other',
          amount: Number(c.monthlyBudget || 0),
          percentage: totalBudgetAmount > 0 ? Math.round((Number(c.monthlyBudget || 0) / totalBudgetAmount) * 100) : Math.round(100 / expenseCategories.length),
          iconCodePoint: c.iconCodePoint || this.getCategoryIconCodePoint(c.name?.toLowerCase() || 'other'),
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    }

    // Build recent transactions (combine salaries and expenses)
    const recentTransactions: DashboardSummary['recentTransactions'] = [];

    // Add recent salaries as income transactions
    monthlySalaries.slice(0, 3).forEach(salary => {
      recentTransactions.push({
        id: salary.id,
        title: salary.description || 'Salary Received',
        category: 'Income',
        amount: Number(salary.amount),
        isIncome: true,
        date: salary.paymentDate,
        iconCodePoint: 0xe8d4, // account_balance_wallet icon
      });
    });

    // Add recent expenses
    allExpenses.slice(0, 5).forEach(expense => {
      recentTransactions.push({
        id: expense.id,
        title: expense.description || expense.merchant || this.formatCategoryName(expense.category),
        category: this.formatCategoryName(expense.category),
        amount: Number(expense.amount),
        isIncome: false,
        date: expense.date,
        iconCodePoint: this.getCategoryIconCodePoint(expense.category),
      });
    });

    // If no transactions, show onboarding summary items
    if (recentTransactions.length === 0) {
      // Show monthly salary as upcoming income
      if (user?.monthlySalary && Number(user.monthlySalary) > 0) {
        recentTransactions.push({
          id: 'salary-upcoming',
          title: 'Monthly Salary',
          category: 'Income',
          amount: Number(user.monthlySalary),
          isIncome: true,
          date: new Date(),
          iconCodePoint: 0xe8d4, // account_balance_wallet
        });
      }

      // Show active loans as EMI payments
      activeLoans.slice(0, 2).forEach(loan => {
        const emiAmount = Number(loan.principalAmount) / (loan.tenureMonths || 12);
        recentTransactions.push({
          id: loan.id,
          title: loan.description || loan.lenderName || 'Loan EMI',
          category: 'EMI Payment',
          amount: emiAmount,
          isIncome: false,
          date: loan.nextPaymentDate || new Date(),
          iconCodePoint: 0xe84f, // credit_card
        });
      });

      // Show goals as savings targets
      goals.filter(g => g.status === GoalStatus.ACTIVE).slice(0, 2).forEach(goal => {
        recentTransactions.push({
          id: goal.id,
          title: goal.name || 'Savings Goal',
          category: 'Goal',
          amount: Number(goal.monthlyContribution || 0),
          isIncome: false,
          date: new Date(),
          iconCodePoint: goal.iconCodePoint || 0xe8e5, // flag
        });
      });
    }

    // Sort by date
    recentTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Calculate loans summary
    const totalOutstanding = activeLoans.reduce((sum, l) => {
      const principal = Number(l.principalAmount);
      const paid = Number(l.paidAmount || 0);
      return sum + (principal - paid);
    }, 0);

    const monthlyEmi = activeLoans.reduce((sum, l) => {
      // Simple EMI calculation if not stored
      const principal = Number(l.principalAmount);
      const tenure = l.tenureMonths || 12;
      return sum + (principal / tenure);
    }, 0);

    // Calculate borrowed summary
    const totalBorrowed = activeBorrows
      .filter(b => b.type === BorrowType.BORROWED)
      .reduce((sum, b) => sum + Number(b.amount), 0);

    const totalLent = activeBorrows
      .filter(b => b.type === BorrowType.LENT)
      .reduce((sum, b) => sum + Number(b.amount), 0);

    return {
      balance: {
        total: totalBalance,
        income: monthlyIncome,
        expense: totalMonthlyExpense,
      },
      stats: {
        saved: saved > 0 ? saved : 0,
        savedPercentage: savedPercentage > 0 ? savedPercentage : 0,
        totalBudget,
        budgetUsedPercentage: Math.min(budgetUsedPercentage, 100),
        goalsCompleted: completedGoals,
        totalGoals: activeGoals.length,
      },
      spendingByCategory,
      recentTransactions: recentTransactions.slice(0, 5),
      loans: {
        totalOutstanding,
        monthlyEmi,
        count: activeLoans.length,
      },
      borrowed: {
        totalBorrowed,
        totalLent,
      },
    };
  }

  private formatCategoryName(category: string): string {
    if (!category) return 'Other';
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  private getCategoryIconCodePoint(category: string): number {
    const iconMap: Record<string, number> = {
      food: 0xe56c, // restaurant
      transport: 0xe531, // directions_car
      shopping: 0xf37a, // shopping_bag
      entertainment: 0xe02c, // movie
      bills: 0xe8b5, // receipt
      health: 0xe3f3, // medical_services
      education: 0xe80c, // school
      travel: 0xe539, // flight
      investment: 0xe907, // trending_up
      other: 0xe5d3, // more_horiz
    };
    return iconMap[category?.toLowerCase()] || iconMap.other;
  }
}
