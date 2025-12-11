import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { IncomeSourceEntity } from '../database/entities/income-source.entity';
import { LoanEntity, LoanType, LoanStatus } from '../database/entities/loan.entity';
import { BorrowEntity, BorrowType, BorrowStatus } from '../database/entities/borrow.entity';
import { GoalEntity, GoalPriority, GoalStatus } from '../database/entities/goal.entity';
import { ExpenseCategoryEntity } from '../database/entities/expense-category.entity';

@Injectable()
export class FinancialService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(IncomeSourceEntity)
    private readonly incomeSourceRepository: Repository<IncomeSourceEntity>,
    @InjectRepository(LoanEntity)
    private readonly loanRepository: Repository<LoanEntity>,
    @InjectRepository(BorrowEntity)
    private readonly borrowRepository: Repository<BorrowEntity>,
    @InjectRepository(GoalEntity)
    private readonly goalRepository: Repository<GoalEntity>,
    @InjectRepository(ExpenseCategoryEntity)
    private readonly expenseCategoryRepository: Repository<ExpenseCategoryEntity>,
  ) {}

  // Save salary data
  async saveSalary(data: any, userId: string) {
    await this.userRepository.update(userId, {
      monthlySalary: data.monthlySalary,
      salaryDate: data.salaryDate,
    });
    return { success: true, message: 'Salary data saved successfully' };
  }

  // Save income sources
  async saveIncomeSources(data: any, userId: string) {
    const { incomeSources } = data;

    // Delete existing income sources for this user
    await this.incomeSourceRepository.delete({ userId });

    // Insert new income sources
    if (incomeSources && incomeSources.length > 0) {
      const entities = incomeSources.map((source: any) =>
        this.incomeSourceRepository.create({
          userId,
          name: source.name,
          amount: source.amount,
          icon: source.icon,
        }),
      );
      await this.incomeSourceRepository.save(entities);
    }

    return { success: true, message: 'Income sources saved successfully' };
  }

  // Save loans data
  async saveLoans(data: any, userId: string) {
    const { loans } = data;

    // Delete existing loans for this user (only from onboarding)
    // In production, you might want to mark them instead of deleting
    await this.loanRepository.delete({ userId });

    // Insert new loans
    if (loans && loans.length > 0) {
      const entities = loans.map((loan: any) => {
        const loanData: any = {
          userId,
          principalAmount: loan.totalAmount || loan.principalAmount,
          interestRate: loan.interestRate || 0,
          tenureMonths: loan.remainingMonths || loan.tenureMonths || 12,
          startDate: new Date(),
          loanType: this.mapLoanType(loan.name),
          status: LoanStatus.ACTIVE,
          lenderName: loan.name,
          description: loan.name,
          paidAmount: (loan.paidMonths || 0) * (loan.emiAmount || 0),
        };
        if (loan.emiDate) {
          loanData.nextPaymentDate = this.getNextPaymentDate(loan.emiDate);
        }
        return this.loanRepository.create(loanData);
      });
      await this.loanRepository.save(entities);
    }

    return { success: true, message: 'Loans saved successfully' };
  }

  // Save borrowed data
  async saveBorrowed(data: any, userId: string) {
    const { borrowed } = data;

    // Delete existing borrow records for this user
    await this.borrowRepository.delete({ userId });

    // Insert new borrow records
    if (borrowed && borrowed.length > 0) {
      const entities = borrowed.map((item: any) => {
        const borrowData: any = {
          userId,
          amount: item.amount,
          type: item.isBorrowed ? BorrowType.BORROWED : BorrowType.LENT,
          status: BorrowStatus.ACTIVE,
          date: new Date(),
          personName: item.personName,
          personContact: item.phoneNumber,
          description: item.notes,
          interestRate: item.interestRate || 0,
        };
        if (item.dueDate) {
          borrowData.dueDate = new Date(item.dueDate);
        }
        return this.borrowRepository.create(borrowData);
      });
      await this.borrowRepository.save(entities);
    }

    return { success: true, message: 'Borrowed data saved successfully' };
  }

  // Save goals
  async saveGoals(data: any, userId: string) {
    const { goals } = data;

    // Delete existing goals for this user
    await this.goalRepository.delete({ userId });

    // Insert new goals
    if (goals && goals.length > 0) {
      const entities = goals.map((goal: any) => {
        const goalData: any = {
          userId,
          name: goal.name,
          targetAmount: goal.targetAmount,
          savedAmount: goal.savedAmount || 0,
          monthlyContribution: goal.monthlyContribution || 0,
          icon: goal.icon,
          iconCodePoint: goal.iconCodePoint,
          notes: goal.notes,
          priority: this.mapGoalPriority(goal.priority),
          status: GoalStatus.ACTIVE,
        };
        if (goal.targetDate) {
          goalData.targetDate = new Date(goal.targetDate);
        }
        return this.goalRepository.create(goalData);
      });
      await this.goalRepository.save(entities);
    }

    return { success: true, message: 'Goals saved successfully' };
  }

  // Save expense categories
  async saveExpenseCategories(data: any, userId: string) {
    const { categories } = data;

    // Delete existing expense categories for this user
    await this.expenseCategoryRepository.delete({ userId });

    // Insert new expense categories
    if (categories && categories.length > 0) {
      const entities = categories.map((category: any) => {
        const categoryData: any = {
          userId,
          name: category.name || 'Unnamed Category',
          monthlyBudget: category.monthlyBudget || 0,
        };
        if (category.icon) {
          categoryData.icon = category.icon;
        }
        if (category.iconCodePoint != null) {
          categoryData.iconCodePoint = category.iconCodePoint;
        }
        if (category.colorValue != null) {
          // Store as string for bigint column
          categoryData.colorValue = String(category.colorValue);
        }
        if (category.notes) {
          categoryData.notes = category.notes;
        }
        return this.expenseCategoryRepository.create(categoryData);
      });
      await this.expenseCategoryRepository.save(entities);
    }

    return { success: true, message: 'Expense categories saved successfully' };
  }

  // Save all setup data at once
  async saveAllSetupData(data: any, userId: string) {
    // Save salary
    if (data.monthlySalary) {
      await this.saveSalary(
        { monthlySalary: data.monthlySalary, salaryDate: data.salaryDate },
        userId,
      );
    }

    // Save income sources
    if (data.incomeSources) {
      await this.saveIncomeSources({ incomeSources: data.incomeSources }, userId);
    }

    // Save loans
    if (data.loansAndEmis) {
      await this.saveLoans({ loans: data.loansAndEmis }, userId);
    }

    // Save borrowed
    if (data.borrowed) {
      await this.saveBorrowed({ borrowed: data.borrowed }, userId);
    }

    // Save goals
    if (data.goals) {
      await this.saveGoals({ goals: data.goals }, userId);
    }

    // Save expense categories
    if (data.expenseCategories) {
      await this.saveExpenseCategories(
        { categories: data.expenseCategories },
        userId,
      );
    }

    return { success: true, message: 'All financial setup data saved successfully' };
  }

  // Mark setup as complete
  async completeSetup(userId: string) {
    await this.userRepository.update(userId, {
      isFinancialSetupComplete: true,
    });
    return { success: true, message: 'Financial setup marked as complete' };
  }

  // Get all setup data
  async getSetupData(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const incomeSources = await this.incomeSourceRepository.find({
      where: { userId },
    });

    const loans = await this.loanRepository.find({
      where: { userId },
    });

    const borrowed = await this.borrowRepository.find({
      where: { userId },
    });

    const goals = await this.goalRepository.find({
      where: { userId },
    });

    const expenseCategories = await this.expenseCategoryRepository.find({
      where: { userId },
    });

    return {
      monthlySalary: user?.monthlySalary,
      salaryDate: user?.salaryDate,
      isSetupComplete: user?.isFinancialSetupComplete,
      incomeSources,
      loansAndEmis: loans,
      borrowed,
      goals,
      expenseCategories,
    };
  }

  // Helper methods
  private mapLoanType(name: string): LoanType {
    const lowerName = name?.toLowerCase() || '';
    if (lowerName.includes('home') || lowerName.includes('house')) {
      return LoanType.HOME;
    }
    if (lowerName.includes('car') || lowerName.includes('vehicle')) {
      return LoanType.CAR;
    }
    if (lowerName.includes('education') || lowerName.includes('student')) {
      return LoanType.EDUCATION;
    }
    if (lowerName.includes('business')) {
      return LoanType.BUSINESS;
    }
    return LoanType.PERSONAL;
  }

  private mapGoalPriority(priority: string): GoalPriority {
    switch (priority?.toLowerCase()) {
      case 'high':
        return GoalPriority.HIGH;
      case 'low':
        return GoalPriority.LOW;
      default:
        return GoalPriority.MEDIUM;
    }
  }

  private getNextPaymentDate(dayOfMonth: number): Date {
    const now = new Date();
    const nextDate = new Date(now.getFullYear(), now.getMonth(), dayOfMonth);
    if (nextDate <= now) {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
    return nextDate;
  }
}
