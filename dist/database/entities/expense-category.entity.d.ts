import { UserEntity } from './user.entity';
export declare class ExpenseCategoryEntity {
    id: string;
    userId: string;
    name: string;
    monthlyBudget: number;
    currency: string;
    icon: string;
    iconCodePoint: number;
    colorValue: string;
    notes: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
