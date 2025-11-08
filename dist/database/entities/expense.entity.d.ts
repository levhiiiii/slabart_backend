import { UserEntity } from './user.entity';
export declare enum ExpenseCategory {
    FOOD = "food",
    TRANSPORT = "transport",
    SHOPPING = "shopping",
    ENTERTAINMENT = "entertainment",
    BILLS = "bills",
    HEALTH = "health",
    EDUCATION = "education",
    TRAVEL = "travel",
    INVESTMENT = "investment",
    OTHER = "other"
}
export declare class ExpenseEntity {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    date: Date;
    category: ExpenseCategory;
    description: string;
    merchant: string;
    paymentMethod: string;
    receipt: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
