import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserAccountDto } from './dto/userAccount.dto';
import { UserAccountService } from './user-account.service';

@Controller('user-account')
export class UserAccountController {
  constructor(private userAccountService: UserAccountService) {}

  @Post('register')
  async register(@Body() data: UserAccountDto) {
    return this.userAccountService.registerUser(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  login(@Request() req): any {
    const { id, password, ...result } = req.user;
    console.log(result);
    return this.userAccountService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protected(@Request() req): string {
    console.log('protected routes =========>  ', req.user);
    return req.user;
  }
}
