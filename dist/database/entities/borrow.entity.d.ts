import { UserEntity } from './user.entity';
export declare enum BorrowType {
    BORROWED = "borrowed",
    LENT = "lent"
}
export declare enum BorrowStatus {
    ACTIVE = "active",
    SETTLED = "settled",
    PARTIALLY_SETTLED = "partiallySettled",
    OVERDUE = "overdue"
}
export declare class BorrowEntity {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    type: BorrowType;
    status: BorrowStatus;
    date: Date;
    personName: string;
    personContact: string;
    personEmail: string;
    description: string;
    dueDate: Date;
    interestRate: number;
    settledAmount: number;
    settledDate: Date;
    reminderDates: Date[];
    paymentHistory: Array<{
        id: string;
        amount: number;
        date: Date;
        notes?: string;
        transactionId?: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
