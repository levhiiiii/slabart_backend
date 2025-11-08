import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryEntity } from '../database/entities/salary.entity';
import { ExpenseEntity } from '../database/entities/expense.entity';
import { LoanEntity } from '../database/entities/loan.entity';
import { BorrowEntity } from '../database/entities/borrow.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SalaryEntity,
      ExpenseEntity,
      LoanEntity,
      BorrowEntity,
    ]),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class DashboardModule {}
