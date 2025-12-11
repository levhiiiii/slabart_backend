import { UserEntity } from './user.entity';
export declare class IncomeSourceEntity {
    id: string;
    userId: string;
    name: string;
    amount: number;
    currency: string;
    icon: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
