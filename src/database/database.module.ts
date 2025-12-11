import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { SalaryEntity } from './entities/salary.entity';
import { ExpenseEntity } from './entities/expense.entity';
import { LoanEntity } from './entities/loan.entity';
import { EMIEntity } from './entities/emi.entity';
import { BorrowEntity } from './entities/borrow.entity';
import { IncomeSourceEntity } from './entities/income-source.entity';
import { GoalEntity } from './entities/goal.entity';
import { ExpenseCategoryEntity } from './entities/expense-category.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          UserEntity,
          SalaryEntity,
          ExpenseEntity,
          LoanEntity,
          EMIEntity,
          BorrowEntity,
          IncomeSourceEntity,
          GoalEntity,
          ExpenseCategoryEntity,
        ],
        synchronize: true, // Set to false in production
        ssl: configService.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
