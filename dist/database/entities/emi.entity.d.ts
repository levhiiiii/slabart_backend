import { LoanEntity } from './loan.entity';
import { UserEntity } from './user.entity';
export declare enum EMIStatus {
    PENDING = "pending",
    PAID = "paid",
    OVERDUE = "overdue",
    PARTIALLY_PAID = "partiallyPaid"
}
export declare class EMIEntity {
    id: string;
    loanId: string;
    userId: string;
    emiNumber: number;
    emiAmount: number;
    principalComponent: number;
    interestComponent: number;
    dueDate: Date;
    status: EMIStatus;
    currency: string;
    paidAmount: number;
    paidDate: Date;
    transactionId: string;
    lateFee: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    loan: LoanEntity;
    user: UserEntity;
}
