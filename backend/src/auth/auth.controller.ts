import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenStrategy } from './refresh-token.strategy';
import { Public } from 'decorators/public.decorator';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const tokens = await this.authService.register(registerDto);
    this.setTokensInCookies(res, tokens);
    return res.send(tokens);
  }

  @Public()
  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);
    this.setTokensInCookies(res, tokens);
    return res.send(tokens);
  }

  @Post('logout')
  @UseGuards(JwtStrategy)
  @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async logout(@Req() req, @Res() res: Response) {
    await this.authService.logout(req.user.userId);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.send({ message: 'Logged out' });
  }

  @Post('refresh')
  @UseGuards(RefreshTokenStrategy)
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async refreshTokens(@Req() req, @Res() res: Response) {
    const tokens = await this.authService.refreshTokens(req.user.refreshToken);
    this.setTokensInCookies(res, tokens);
    return res.send(tokens);
  }

  private setTokensInCookies(res: Response, tokens: any) {
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
  }
}
