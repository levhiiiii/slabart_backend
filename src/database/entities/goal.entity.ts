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

export enum GoalPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum GoalStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
}

@Entity('goals')
export class GoalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 12, scale: 2 })
  targetAmount: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  savedAmount: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  monthlyContribution: number;

  @Column({ default: 'INR' })
  currency: string;

  @Column({ type: 'date', nullable: true })
  targetDate: Date;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  iconCodePoint: number;

  @Column({ nullable: true })
  notes: string;

  @Column({
    type: 'enum',
    enum: GoalPriority,
    default: GoalPriority.MEDIUM,
  })
  priority: GoalPriority;

  @Column({
    type: 'enum',
    enum: GoalStatus,
    default: GoalStatus.ACTIVE,
  })
  status: GoalStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.goals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
