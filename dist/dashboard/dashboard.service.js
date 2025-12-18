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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const salary_entity_1 = require("../database/entities/salary.entity");
const expense_entity_1 = require("../database/entities/expense.entity");
const loan_entity_1 = require("../database/entities/loan.entity");
const borrow_entity_1 = require("../database/entities/borrow.entity");
const goal_entity_1 = require("../database/entities/goal.entity");
const expense_category_entity_1 = require("../database/entities/expense-category.entity");
const income_source_entity_1 = require("../database/entities/income-source.entity");
const user_entity_1 = require("../database/entities/user.entity");
let DashboardService = class DashboardService {
    userRepository;
    salaryRepository;
    expenseRepository;
    loanRepository;
    borrowRepository;
    goalRepository;
    expenseCategoryRepository;
    incomeSourceRepository;
    constructor(userRepository, salaryRepository, expenseRepository, loanRepository, borrowRepository, goalRepository, expenseCategoryRepository, incomeSourceRepository) {
        this.userRepository = userRepository;
        this.salaryRepository = salaryRepository;
        this.expenseRepository = expenseRepository;
        this.loanRepository = loanRepository;
        this.borrowRepository = borrowRepository;
        this.goalRepository = goalRepository;
        this.expenseCategoryRepository = expenseCategoryRepository;
        this.incomeSourceRepository = incomeSourceRepository;
    }
    async getDashboardSummary(userId) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        const [user, monthlySalaries, incomeSources, monthlyExpenses, allExpenses, activeLoans, activeBorrows, goals, expenseCategories,] = await Promise.all([
            this.userRepository.findOne({ where: { id: userId } }),
            this.salaryRepository.find({
                where: {
                    userId,
                    paymentDate: (0, typeorm_2.Between)(startOfMonth, endOfMonth),
                    isReceived: true,
                },
            }),
            this.incomeSourceRepository.find({ where: { userId } }),
            this.expenseRepository.find({
                where: {
                    userId,
                    date: (0, typeorm_2.Between)(startOfMonth, endOfMonth),
                },
                order: { date: 'DESC' },
            }),
            this.expenseRepository.find({
                where: { userId },
                order: { date: 'DESC' },
                take: 10,
            }),
            this.loanRepository.find({
                where: { userId, status: loan_entity_1.LoanStatus.ACTIVE },
            }),
            this.borrowRepository.find({
                where: { userId, status: borrow_entity_1.BorrowStatus.ACTIVE },
            }),
            this.goalRepository.find({
                where: { userId },
            }),
            this.expenseCategoryRepository.find({ where: { userId } }),
        ]);
        const salaryIncome = monthlySalaries.reduce((sum, s) => sum + Number(s.amount), 0);
        const otherIncome = incomeSources.reduce((sum, s) => sum + Number(s.amount), 0);
        const monthlyIncome = user?.monthlySalary
            ? Number(user.monthlySalary) + otherIncome
            : salaryIncome + otherIncome;
        console.log('=== DASHBOARD DEBUG START ===');
        console.log('UserId from JWT:', userId);
        console.log('expenseCategories query result:', expenseCategories);
        console.log('expenseCategories length:', expenseCategories?.length);
        const actualMonthlyExpense = monthlyExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
        const totalBudgetAmount = expenseCategories.reduce((sum, c) => {
            const budget = Number(c.monthlyBudget || 0);
            console.log(`  Category: ${c.name}, monthlyBudget raw: ${c.monthlyBudget}, parsed: ${budget}`);
            return sum + budget;
        }, 0);
        console.log('Calculated values:', {
            totalBudgetAmount,
            actualMonthlyExpense,
            monthlyIncome,
        });
        console.log('=== DASHBOARD DEBUG END ===');
        const totalMonthlyExpense = actualMonthlyExpense > 0 ? actualMonthlyExpense : totalBudgetAmount;
        const totalBalance = monthlyIncome - totalMonthlyExpense;
        const saved = monthlyIncome - totalMonthlyExpense;
        const savedPercentage = monthlyIncome > 0 ? Math.round((saved / monthlyIncome) * 100) : 0;
        const totalBudget = totalBudgetAmount;
        const budgetUsedPercentage = totalBudget > 0 ? Math.round((actualMonthlyExpense / totalBudget) * 100) : 0;
        const activeGoals = goals.filter(g => g.status === goal_entity_1.GoalStatus.ACTIVE || g.status === goal_entity_1.GoalStatus.COMPLETED);
        const completedGoals = goals.filter(g => g.status === goal_entity_1.GoalStatus.COMPLETED).length;
        const categorySpending = new Map();
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
        if (spendingByCategory.length === 0 && expenseCategories.length > 0) {
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
        const recentTransactions = [];
        monthlySalaries.slice(0, 3).forEach(salary => {
            recentTransactions.push({
                id: salary.id,
                title: salary.description || 'Salary Received',
                category: 'Income',
                amount: Number(salary.amount),
                isIncome: true,
                date: salary.paymentDate,
                iconCodePoint: 0xe8d4,
            });
        });
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
        if (recentTransactions.length === 0) {
            if (user?.monthlySalary && Number(user.monthlySalary) > 0) {
                recentTransactions.push({
                    id: 'salary-upcoming',
                    title: 'Monthly Salary',
                    category: 'Income',
                    amount: Number(user.monthlySalary),
                    isIncome: true,
                    date: new Date(),
                    iconCodePoint: 0xe8d4,
                });
            }
            activeLoans.slice(0, 2).forEach(loan => {
                const emiAmount = Number(loan.principalAmount) / (loan.tenureMonths || 12);
                recentTransactions.push({
                    id: loan.id,
                    title: loan.description || loan.lenderName || 'Loan EMI',
                    category: 'EMI Payment',
                    amount: emiAmount,
                    isIncome: false,
                    date: loan.nextPaymentDate || new Date(),
                    iconCodePoint: 0xe84f,
                });
            });
            goals.filter(g => g.status === goal_entity_1.GoalStatus.ACTIVE).slice(0, 2).forEach(goal => {
                recentTransactions.push({
                    id: goal.id,
                    title: goal.name || 'Savings Goal',
                    category: 'Goal',
                    amount: Number(goal.monthlyContribution || 0),
                    isIncome: false,
                    date: new Date(),
                    iconCodePoint: goal.iconCodePoint || 0xe8e5,
                });
            });
        }
        recentTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const totalOutstanding = activeLoans.reduce((sum, l) => {
            const principal = Number(l.principalAmount);
            const paid = Number(l.paidAmount || 0);
            return sum + (principal - paid);
        }, 0);
        const monthlyEmi = activeLoans.reduce((sum, l) => {
            const principal = Number(l.principalAmount);
            const tenure = l.tenureMonths || 12;
            return sum + (principal / tenure);
        }, 0);
        const totalBorrowed = activeBorrows
            .filter(b => b.type === borrow_entity_1.BorrowType.BORROWED)
            .reduce((sum, b) => sum + Number(b.amount), 0);
        const totalLent = activeBorrows
            .filter(b => b.type === borrow_entity_1.BorrowType.LENT)
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
    formatCategoryName(category) {
        if (!category)
            return 'Other';
        return category
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    getCategoryIconCodePoint(category) {
        const iconMap = {
            food: 0xe56c,
            transport: 0xe531,
            shopping: 0xf37a,
            entertainment: 0xe02c,
            bills: 0xe8b5,
            health: 0xe3f3,
            education: 0xe80c,
            travel: 0xe539,
            investment: 0xe907,
            other: 0xe5d3,
        };
        return iconMap[category?.toLowerCase()] || iconMap.other;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(salary_entity_1.SalaryEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(expense_entity_1.ExpenseEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(loan_entity_1.LoanEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(borrow_entity_1.BorrowEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(goal_entity_1.GoalEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(expense_category_entity_1.ExpenseCategoryEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(income_source_entity_1.IncomeSourceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map