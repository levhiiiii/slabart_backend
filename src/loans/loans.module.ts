import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanEntity } from '../database/entities/loan.entity';
import { EMIEntity } from '../database/entities/emi.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity, EMIEntity]), AuthModule],
  controllers: [],
  providers: [],
})
export class LoansModule {}
