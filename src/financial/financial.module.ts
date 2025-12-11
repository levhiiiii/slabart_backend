import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialController } from './financial.controller';
import { FinancialService } from './financial.service';
import { UserEntity } from '../database/entities/user.entity';
import { IncomeSourceEntity } from '../database/entities/income-source.entity';
import { LoanEntity } from '../database/entities/loan.entity';
import { BorrowEntity } from '../database/entities/borrow.entity';
import { GoalEntity } from '../database/entities/goal.entity';
import { ExpenseCategoryEntity } from '../database/entities/expense-category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      IncomeSourceEntity,
      LoanEntity,
      BorrowEntity,
      GoalEntity,
      ExpenseCategoryEntity,
    ]),
    AuthModule,
  ],
  controllers: [FinancialController],
  providers: [FinancialService],
  exports: [FinancialService],
})
export class FinancialModule {}
