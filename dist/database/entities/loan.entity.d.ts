import { UserEntity } from './user.entity';
import { EMIEntity } from './emi.entity';
export declare enum LoanType {
    PERSONAL = "personal",
    HOME = "home",
    CAR = "car",
    EDUCATION = "education",
    BUSINESS = "business",
    OTHER = "other"
}
export declare enum LoanStatus {
    ACTIVE = "active",
    PAID = "paid",
    DEFAULTED = "defaulted",
    CLOSED = "closed"
}
export declare class LoanEntity {
    id: string;
    userId: string;
    principalAmount: number;
    interestRate: number;
    tenureMonths: number;
    startDate: Date;
    loanType: LoanType;
    status: LoanStatus;
    currency: string;
    lenderName: string;
    lenderContact: string;
    description: string;
    processingFee: number;
    prepaymentCharges: number;
    paidAmount: number;
    lastPaymentDate: Date;
    nextPaymentDate: Date;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
    emis: EMIEntity[];
}
