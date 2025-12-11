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

@Entity('expense_categories')
export class ExpenseCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 12, scale: 2 })
  monthlyBudget: number;

  @Column({ default: 'INR' })
  currency: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  iconCodePoint: number;

  @Column({ type: 'bigint', nullable: true })
  colorValue: string; // bigint stored as string in TypeORM

  @Column({ nullable: true })
  notes: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.expenseCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
