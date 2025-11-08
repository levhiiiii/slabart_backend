import { UserEntity } from './user.entity';
export declare class SalaryEntity {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    paymentDate: Date;
    description: string;
    company: string;
    designation: string;
    breakdown: Record<string, number>;
    isReceived: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
