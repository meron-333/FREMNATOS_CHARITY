import { Body, Controller, Get, Post, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { CreateUserDto, LoginDto } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  getProfile(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      return this.authService.findOne(decoded.userId);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}