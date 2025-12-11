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
exports.FinancialService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const income_source_entity_1 = require("../database/entities/income-source.entity");
const loan_entity_1 = require("../database/entities/loan.entity");
const borrow_entity_1 = require("../database/entities/borrow.entity");
const goal_entity_1 = require("../database/entities/goal.entity");
const expense_category_entity_1 = require("../database/entities/expense-category.entity");
let FinancialService = class FinancialService {
    userRepository;
    incomeSourceRepository;
    loanRepository;
    borrowRepository;
    goalRepository;
    expenseCategoryRepository;
    constructor(userRepository, incomeSourceRepository, loanRepository, borrowRepository, goalRepository, expenseCategoryRepository) {
        this.userRepository = userRepository;
        this.incomeSourceRepository = incomeSourceRepository;
        this.loanRepository = loanRepository;
        this.borrowRepository = borrowRepository;
        this.goalRepository = goalRepository;
        this.expenseCategoryRepository = expenseCategoryRepository;
    }
    async saveSalary(data, userId) {
        await this.userRepository.update(userId, {
            monthlySalary: data.monthlySalary,
            salaryDate: data.salaryDate,
        });
        return { success: true, message: 'Salary data saved successfully' };
    }
    async saveIncomeSources(data, userId) {
        const { incomeSources } = data;
        await this.incomeSourceRepository.delete({ userId });
        if (incomeSources && incomeSources.length > 0) {
            const entities = incomeSources.map((source) => this.incomeSourceRepository.create({
                userId,
                name: source.name,
                amount: source.amount,
                icon: source.icon,
            }));
            await this.incomeSourceRepository.save(entities);
        }
        return { success: true, message: 'Income sources saved successfully' };
    }
    async saveLoans(data, userId) {
        const { loans } = data;
        await this.loanRepository.delete({ userId });
        if (loans && loans.length > 0) {
            const entities = loans.map((loan) => {
                const loanData = {
                    userId,
                    principalAmount: loan.totalAmount || loan.principalAmount,
                    interestRate: loan.interestRate || 0,
                    tenureMonths: loan.remainingMonths || loan.tenureMonths || 12,
                    startDate: new Date(),
                    loanType: this.mapLoanType(loan.name),
                    status: loan_entity_1.LoanStatus.ACTIVE,
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
    async saveBorrowed(data, userId) {
        const { borrowed } = data;
        await this.borrowRepository.delete({ userId });
        if (borrowed && borrowed.length > 0) {
            const entities = borrowed.map((item) => {
                const borrowData = {
                    userId,
                    amount: item.amount,
                    type: item.isBorrowed ? borrow_entity_1.BorrowType.BORROWED : borrow_entity_1.BorrowType.LENT,
                    status: borrow_entity_1.BorrowStatus.ACTIVE,
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
    async saveGoals(data, userId) {
        const { goals } = data;
        await this.goalRepository.delete({ userId });
        if (goals && goals.length > 0) {
            const entities = goals.map((goal) => {
                const goalData = {
                    userId,
                    name: goal.name,
                    targetAmount: goal.targetAmount,
                    savedAmount: goal.savedAmount || 0,
                    monthlyContribution: goal.monthlyContribution || 0,
                    icon: goal.icon,
                    iconCodePoint: goal.iconCodePoint,
                    notes: goal.notes,
                    priority: this.mapGoalPriority(goal.priority),
                    status: goal_entity_1.GoalStatus.ACTIVE,
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
    async saveExpenseCategories(data, userId) {
        const { categories } = data;
        await this.expenseCategoryRepository.delete({ userId });
        if (categories && categories.length > 0) {
            const entities = categories.map((category) => this.expenseCategoryRepository.create({
                userId,
                name: category.name,
                monthlyBudget: category.monthlyBudget,
                icon: category.icon,
                iconCodePoint: category.iconCodePoint,
                colorValue: category.colorValue,
                notes: category.notes,
            }));
            await this.expenseCategoryRepository.save(entities);
        }
        return { success: true, message: 'Expense categories saved successfully' };
    }
    async saveAllSetupData(data, userId) {
        if (data.monthlySalary) {
            await this.saveSalary({ monthlySalary: data.monthlySalary, salaryDate: data.salaryDate }, userId);
        }
        if (data.incomeSources) {
            await this.saveIncomeSources({ incomeSources: data.incomeSources }, userId);
        }
        if (data.loansAndEmis) {
            await this.saveLoans({ loans: data.loansAndEmis }, userId);
        }
        if (data.borrowed) {
            await this.saveBorrowed({ borrowed: data.borrowed }, userId);
        }
        if (data.goals) {
            await this.saveGoals({ goals: data.goals }, userId);
        }
        if (data.expenseCategories) {
            await this.saveExpenseCategories({ categories: data.expenseCategories }, userId);
        }
        return { success: true, message: 'All financial setup data saved successfully' };
    }
    async completeSetup(userId) {
        await this.userRepository.update(userId, {
            isFinancialSetupComplete: true,
        });
        return { success: true, message: 'Financial setup marked as complete' };
    }
    async getSetupData(userId) {
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
    mapLoanType(name) {
        const lowerName = name?.toLowerCase() || '';
        if (lowerName.includes('home') || lowerName.includes('house')) {
            return loan_entity_1.LoanType.HOME;
        }
        if (lowerName.includes('car') || lowerName.includes('vehicle')) {
            return loan_entity_1.LoanType.CAR;
        }
        if (lowerName.includes('education') || lowerName.includes('student')) {
            return loan_entity_1.LoanType.EDUCATION;
        }
        if (lowerName.includes('business')) {
            return loan_entity_1.LoanType.BUSINESS;
        }
        return loan_entity_1.LoanType.PERSONAL;
    }
    mapGoalPriority(priority) {
        switch (priority?.toLowerCase()) {
            case 'high':
                return goal_entity_1.GoalPriority.HIGH;
            case 'low':
                return goal_entity_1.GoalPriority.LOW;
            default:
                return goal_entity_1.GoalPriority.MEDIUM;
        }
    }
    getNextPaymentDate(dayOfMonth) {
        const now = new Date();
        const nextDate = new Date(now.getFullYear(), now.getMonth(), dayOfMonth);
        if (nextDate <= now) {
            nextDate.setMonth(nextDate.getMonth() + 1);
        }
        return nextDate;
    }
};
exports.FinancialService = FinancialService;
exports.FinancialService = FinancialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(income_source_entity_1.IncomeSourceEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(loan_entity_1.LoanEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(borrow_entity_1.BorrowEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(goal_entity_1.GoalEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(expense_category_entity_1.ExpenseCategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FinancialService);
//# sourceMappingURL=financial.service.js.map