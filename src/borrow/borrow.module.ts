import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity } from '../database/entities/borrow.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowEntity]), AuthModule],
  controllers: [],
  providers: [],
})
export class BorrowModule {}
