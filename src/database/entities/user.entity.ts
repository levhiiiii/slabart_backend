import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { SalaryEntity } from './salary.entity';
import { ExpenseEntity } from './expense.entity';
import { LoanEntity } from './loan.entity';
import { BorrowEntity } from './borrow.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  firebaseUid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  // Relations
  @OneToMany(() => SalaryEntity, (salary) => salary.user)
  salaries: SalaryEntity[];

  @OneToMany(() => ExpenseEntity, (expense) => expense.user)
  expenses: ExpenseEntity[];

  @OneToMany(() => LoanEntity, (loan) => loan.user)
  loans: LoanEntity[];

  @OneToMany(() => BorrowEntity, (borrow) => borrow.user)
  borrows: BorrowEntity[];
}
