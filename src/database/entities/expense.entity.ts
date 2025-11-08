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

export enum ExpenseCategory {
  FOOD = 'food',
  TRANSPORT = 'transport',
  SHOPPING = 'shopping',
  ENTERTAINMENT = 'entertainment',
  BILLS = 'bills',
  HEALTH = 'health',
  EDUCATION = 'education',
  TRAVEL = 'travel',
  INVESTMENT = 'investment',
  OTHER = 'other',
}

@Entity('expenses')
export class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'INR' })
  currency: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
    default: ExpenseCategory.OTHER,
  })
  category: ExpenseCategory;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  merchant: string;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  receipt: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.expenses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
