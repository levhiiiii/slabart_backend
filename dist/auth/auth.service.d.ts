import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { SignUpDto, SignInDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            displayName: string;
            photoUrl: string;
            isEmailVerified: boolean;
        };
    }>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            displayName: string;
            photoUrl: string;
            isEmailVerified: boolean;
        };
    }>;
    signInWithFirebase(firebaseUid: string, email: string, displayName?: string, photoUrl?: string): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            displayName: string;
            photoUrl: string;
            isEmailVerified: boolean;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        displayName: string;
        photoUrl: string;
        phoneNumber: string;
        isEmailVerified: boolean;
        createdAt: Date;
        lastLoginAt: Date;
    }>;
    validateUser(userId: string): Promise<UserEntity>;
}
