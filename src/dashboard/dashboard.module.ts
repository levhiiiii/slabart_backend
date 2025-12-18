import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryEntity } from '../database/entities/salary.entity';
import { ExpenseEntity } from '../database/entities/expense.entity';
import { LoanEntity } from '../database/entities/loan.entity';
import { BorrowEntity } from '../database/entities/borrow.entity';
import { GoalEntity } from '../database/entities/goal.entity';
import { ExpenseCategoryEntity } from '../database/entities/expense-category.entity';
import { IncomeSourceEntity } from '../database/entities/income-source.entity';
import { UserEntity } from '../database/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SalaryEntity,
      ExpenseEntity,
      LoanEntity,
      BorrowEntity,
      GoalEntity,
      ExpenseCategoryEntity,
      IncomeSourceEntity,
    ]),
    AuthModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
