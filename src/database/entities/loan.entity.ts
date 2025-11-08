import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { EMIEntity } from './emi.entity';

export enum LoanType {
  PERSONAL = 'personal',
  HOME = 'home',
  CAR = 'car',
  EDUCATION = 'education',
  BUSINESS = 'business',
  OTHER = 'other',
}

export enum LoanStatus {
  ACTIVE = 'active',
  PAID = 'paid',
  DEFAULTED = 'defaulted',
  CLOSED = 'closed',
}

@Entity('loans')
export class LoanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('decimal', { precision: 12, scale: 2 })
  principalAmount: number;

  @Column('decimal', { precision: 5, scale: 2 })
  interestRate: number;

  @Column('int')
  tenureMonths: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({
    type: 'enum',
    enum: LoanType,
    default: LoanType.PERSONAL,
  })
  loanType: LoanType;

  @Column({
    type: 'enum',
    enum: LoanStatus,
    default: LoanStatus.ACTIVE,
  })
  status: LoanStatus;

  @Column({ default: 'INR' })
  currency: string;

  @Column({ nullable: true })
  lenderName: string;

  @Column({ nullable: true })
  lenderContact: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  processingFee: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  prepaymentCharges: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ type: 'timestamp', nullable: true })
  lastPaymentDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  nextPaymentDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.loans, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => EMIEntity, (emi) => emi.loan)
  emis: EMIEntity[];
}
