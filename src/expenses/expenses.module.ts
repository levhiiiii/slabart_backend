import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from '../database/entities/expense.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity]), AuthModule],
  controllers: [],
  providers: [],
})
export class ExpensesModule {}
