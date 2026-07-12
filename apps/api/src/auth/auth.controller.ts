import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SetupDto } from './dto/setup.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('setup')
  @ApiOperation({ summary: 'Initial setup for the owner password' })
  @ApiResponse({ status: 201, description: 'Owner configured successfully.' })
  async setup(@Body() dto: SetupDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.setup(dto);
    this.setCookies(res, tokens.accessToken, tokens.refreshToken);
    return { message: 'Setup successful' };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login as the owner' })
  @ApiResponse({ status: 200, description: 'Logged in successfully.' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(dto);
    this.setCookies(res, tokens.accessToken, tokens.refreshToken);
    return { message: 'Login successful' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout and clear session' })
  @ApiResponse({ status: 200, description: 'Logged out successfully.' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: 'Logout successful' };
  }

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  }
}
