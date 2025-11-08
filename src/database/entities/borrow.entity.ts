import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum BorrowType {
  BORROWED = 'borrowed',
  LENT = 'lent',
}

export enum BorrowStatus {
  ACTIVE = 'active',
  SETTLED = 'settled',
  PARTIALLY_SETTLED = 'partiallySettled',
  OVERDUE = 'overdue',
}

@Entity('borrows')
export class BorrowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'INR' })
  currency: string;

  @Column({
    type: 'enum',
    enum: BorrowType,
    default: BorrowType.BORROWED,
  })
  type: BorrowType;

  @Column({
    type: 'enum',
    enum: BorrowStatus,
    default: BorrowStatus.ACTIVE,
  })
  status: BorrowStatus;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  personName: string;

  @Column({ nullable: true })
  personContact: string;

  @Column({ nullable: true })
  personEmail: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  interestRate: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  settledAmount: number;

  @Column({ type: 'timestamp', nullable: true })
  settledDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  reminderDates: Date[];

  @Column({ type: 'jsonb', nullable: true })
  paymentHistory: Array<{
    id: string;
    amount: number;
    date: Date;
    notes?: string;
    transactionId?: string;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.borrows, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
