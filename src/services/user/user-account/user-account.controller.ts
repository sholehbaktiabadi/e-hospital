import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { refreshTokenDto } from '../../auth/dto/auth.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserAccountDto } from './dto/userAccount.dto';
import { UserAccountService } from './user-account.service';

@Controller('user-account')
export class UserAccountController {
  constructor(private userAccountService: UserAccountService) {}

  @Post('register')
  async register(@Body() data: UserAccountDto) {
    return this.userAccountService.register(data);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.userAccountService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protected(@Request() req): Promise<any> {
    console.log(req.user);
    return await req.user;
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshToken: refreshTokenDto) {
    return await this.userAccountService.refreshToken(refreshToken);
  }
}
