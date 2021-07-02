import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AutheticatedGuard } from '../auth/authenticated.guard';
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
  @Get()
  async finOne(@Request() req) {
    console.log(req.user);
    return { msg: 'youre logged in !'};
  }
  
  @UseGuards(AutheticatedGuard)
  @Get('protected')
  async protected(@Request() req) {
    return req.user;
  }

}
