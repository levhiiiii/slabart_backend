import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { SalaryEntity } from '../database/entities/salary.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SalaryEntity]), AuthModule],
  controllers: [SalaryController],
  providers: [SalaryService],
  exports: [SalaryService],
})
export class SalaryModule {}
