import { Controller, Post, UseGuards, Get, Body, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Md5 } from 'ts-md5';

import { CreateUserDto, LoginUserDto } from 'src/api/users/dto/user.dto';
import { JwtAuthGuard } from 'src/commons/guard/jwt.guard';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    const { id, username, refreshToken, updatedAt } = req.user;

    return { id, username, refreshToken, updatedAt };
  }

  @Post('refresh')
  refresh(@Body() body) {
    return this.authService.refresh(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    await this.authService.logout(req.user);
    return {
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('partner')
  async connectBySecretKey() {
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();

    const reqUrl = 'http://localhost:7001';

    const token = Md5.hashStr(
      `${reqUrl}${current}${this.config.get('SECRET_KEY')}`,
    );

    const data = {
      token,
      time: current,
    };

    const res = await fetch(reqUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
    });

    return res.json();
  }
}
