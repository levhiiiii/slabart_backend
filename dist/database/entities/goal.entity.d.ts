import { UserEntity } from './user.entity';
export declare enum GoalPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export declare enum GoalStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    PAUSED = "paused",
    CANCELLED = "cancelled"
}
export declare class GoalEntity {
    id: string;
    userId: string;
    name: string;
    targetAmount: number;
    savedAmount: number;
    monthlyContribution: number;
    currency: string;
    targetDate: Date;
    icon: string;
    iconCodePoint: number;
    notes: string;
    priority: GoalPriority;
    status: GoalStatus;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
