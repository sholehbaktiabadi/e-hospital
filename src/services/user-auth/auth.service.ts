import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAccountService } from '../user-account/user-account.service';
import { refreshTokenDto } from './dto/auth.dto';

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
    const payloads = {
      id: user.id,
      username: user.username,
      phone_number: user.phone_number,
    };
    return {
      acceess_token: this.jwtService.sign(payloads),
    };
  }

  async refreshToken({ refreshToken }: refreshTokenDto) {
    const user = this.jwtService.decode(refreshToken);
    const payloads = {
      id: user['id'],
      username: user['username'],
      phone_number: user['phone_number'],
    };
    const access_token = this.jwtService.sign(payloads);
    return access_token;
  }
}
