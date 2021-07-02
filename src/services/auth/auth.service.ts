import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserAccountService } from '../user-account/user-account.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserAccountService))
    private userService: UserAccountService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username, password);
    if (user && user.password === password) {
      return user;
    } else {
      return ' not found';
    }
  }
}
