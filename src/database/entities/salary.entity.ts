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

@Entity('salaries')
export class SalaryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'INR' })
  currency: string;

  @Column({ type: 'date' })
  paymentDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ type: 'jsonb', nullable: true })
  breakdown: Record<string, number>;

  @Column({ default: false })
  isReceived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.salaries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
