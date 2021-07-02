import { Body, Controller, Post } from '@nestjs/common';
import { UserAccountDto } from './dto/userAccount.dto';
import { UserAccountService } from './user-account.service';

@Controller('user-account')
export class UserAccountController {
  constructor(private userAccountService: UserAccountService) {}

  @Post()
  async finOne(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.userAccountService.auth(username, password);
  }

  @Post('register')
  async register(@Body() data: UserAccountDto) {
    return this.userAccountService.registerUser(data);
  }
}
