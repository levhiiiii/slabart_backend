import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SalaryModule } from './salary/salary.module';
import { ExpensesModule } from './expenses/expenses.module';
import { LoansModule } from './loans/loans.module';
import { BorrowModule } from './borrow/borrow.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FinancialModule } from './financial/financial.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    SalaryModule,
    ExpensesModule,
    LoansModule,
    BorrowModule,
    DashboardModule,
    FinancialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
