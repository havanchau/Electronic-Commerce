import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { email, password, phone, name } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({ email, password: hashedPassword, phone, name });
    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async logout(userId: number): Promise<void> {
    await this.userService.update(userId, { refreshToken: null });
  }

  async refreshTokens(refreshToken: string): Promise<any> {
    const payload = await this.jwtService.verifyAsync(refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET });
    const user = await this.userService.findById(payload.sub);

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' });

    await this.userService.update(user.id, { refreshToken });

    return { accessToken, refreshToken };
  }
}
