import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../database/entities/user.entity';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, displayName } = signUpDto;

    // Check if user exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      displayName,
      isEmailVerified: false,
    });

    await this.userRepository.save(user);

    // Generate JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoUrl,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    // Find user
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    // Generate JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoUrl,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }

  async signInWithFirebase(firebaseUid: string, email: string, displayName?: string, photoUrl?: string) {
    // Find or create user
    let user = await this.userRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      // Check if user with email exists
      user = await this.userRepository.findOne({
        where: { email },
      });

      if (user) {
        // Link Firebase UID to existing user
        user.firebaseUid = firebaseUid;
        if (displayName) user.displayName = displayName;
        if (photoUrl) user.photoUrl = photoUrl;
      } else {
        // Create new user
        user = this.userRepository.create({
          email,
          firebaseUid,
          displayName,
          photoUrl,
          isEmailVerified: true,
        });
      }

      user.lastLoginAt = new Date();
      await this.userRepository.save(user);
    }

    // Generate JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoUrl,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      phoneNumber: user.phoneNumber,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    };
  }

  async validateUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
