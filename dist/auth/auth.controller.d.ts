import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, FirebaseAuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    firebaseAuth(firebaseAuthDto: FirebaseAuthDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            displayName: string;
            photoUrl: string;
            isEmailVerified: boolean;
        };
    }>;
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        displayName: string;
        photoUrl: string;
        phoneNumber: string;
        isEmailVerified: boolean;
        createdAt: Date;
        lastLoginAt: Date;
    }>;
}
