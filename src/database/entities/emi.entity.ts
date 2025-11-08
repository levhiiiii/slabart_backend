import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LoanEntity } from './loan.entity';
import { UserEntity } from './user.entity';

export enum EMIStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  PARTIALLY_PAID = 'partiallyPaid',
}

@Entity('emis')
export class EMIEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  loanId: string;

  @Column('uuid')
  userId: string;

  @Column('int')
  emiNumber: number;

  @Column('decimal', { precision: 10, scale: 2 })
  emiAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  principalComponent: number;

  @Column('decimal', { precision: 10, scale: 2 })
  interestComponent: number;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: EMIStatus,
    default: EMIStatus.PENDING,
  })
  status: EMIStatus;

  @Column({ default: 'INR', nullable: true })
  currency: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  paidAmount: number;

  @Column({ type: 'timestamp', nullable: true })
  paidDate: Date;

  @Column({ nullable: true })
  transactionId: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  lateFee: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => LoanEntity, (loan) => loan.emis, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'loanId' })
  loan: LoanEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
