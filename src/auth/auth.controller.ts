import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, FirebaseAuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up with email and password' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in with email and password' })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('firebase')
  @ApiOperation({ summary: 'Sign in with Firebase (Google)' })
  async firebaseAuth(@Body() firebaseAuthDto: FirebaseAuthDto) {
    return this.authService.signInWithFirebase(
      firebaseAuthDto.firebaseUid,
      firebaseAuthDto.email,
      firebaseAuthDto.displayName,
      firebaseAuthDto.photoUrl,
    );
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }
}
