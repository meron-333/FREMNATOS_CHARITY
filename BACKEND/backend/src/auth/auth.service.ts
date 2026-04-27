import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { User, CreateUserDto, LoginDto, AuthResponse } from './auth.types';

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: '1',
      email: 'admin@freminatos.org',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ];

  private generateId(): string {
    return (this.users.length + 1).toString();
  }

  private generateToken(user: Omit<User, 'password'>): string {
    // In production, use proper JWT signing with secret
    return Buffer.from(JSON.stringify({ userId: user.id, role: user.role })).toString('base64');
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const existingUser = this.users.find((u) => u.email === createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser: User = {
      id: this.generateId(),
      role: createUserDto.role || 'user',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createUserDto,
    };

    this.users.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return {
      accessToken: this.generateToken(userWithoutPassword),
      user: userWithoutPassword,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = this.users.find(
      (u) => u.email === loginDto.email && u.password === loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const { password, ...userWithoutPassword } = user;
    return {
      accessToken: this.generateToken(userWithoutPassword),
      user: userWithoutPassword,
    };
  }

  async validateUser(userId: string): Promise<Omit<User, 'password'> | null> {
    const user = this.users.find((u) => u.id === userId);
    if (!user || !user.isActive) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...user }) => user);
  }

  findOne(id: string): Omit<User, 'password'> | null {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    const { password, ...result } = user;
    return result;
  }
}