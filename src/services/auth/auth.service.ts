import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAccountService } from '../user-account/user-account.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserAccountService))
    private userService: UserAccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username, password);
    if (username === user.username && user.password === password) {
      return user;
    } else {
      return 'not found';
    }
  }

  async login(user: any) {
    const payloads = { username: user.username, id: user.id };
    return {
      acceess_token: this.jwtService.sign(payloads),
    };
  }
}
