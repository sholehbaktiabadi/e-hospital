import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user-account/model/user-account.entity';
import { refreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getToken(user: User) {
    const payloads = {
      id: user.id,
      username: user.username,
      phone_number: user.phone_number,
    };
    return { acceess_token: this.jwtService.sign(payloads) };
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
