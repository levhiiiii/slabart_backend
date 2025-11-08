import { SalaryEntity } from './salary.entity';
import { ExpenseEntity } from './expense.entity';
import { LoanEntity } from './loan.entity';
import { BorrowEntity } from './borrow.entity';
export declare class UserEntity {
    id: string;
    email: string;
    displayName: string;
    photoUrl: string;
    phoneNumber: string;
    isEmailVerified: boolean;
    password: string;
    firebaseUid: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date;
    salaries: SalaryEntity[];
    expenses: ExpenseEntity[];
    loans: LoanEntity[];
    borrows: BorrowEntity[];
}
