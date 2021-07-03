import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../user-auth/auth.service';
import { refreshTokenDto } from '../user-auth/dto/auth.dto';
import { UserMessagerService } from '../user-messager/user-messager.service';
import { UserAccountDto } from './dto/userAccount.dto';
import { User } from './model/user-account.entity';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(User)
    private userAccount: Repository<User>,
    private readonly authService: AuthService,
    private readonly userVerifService: UserMessagerService,
  ) {}

  async registerUser(data: UserAccountDto) {
    if (!data) {
      return 'datas body reqired !';
    }
    const dto = new UserAccountDto();
    dto.username = data.username;
    dto.email = data.email;
    dto.password = data.password;
    dto.phone_number = data.phone_number;

    try {
      return await this.userAccount.save(dto);
    } catch (error) {
      return error;
    }
  }

  async userVerification(phoneNumber: string) {
    return await this.userVerifService.SendPinCode(phoneNumber);
  }

  async findOne(username: string, password: string): Promise<User> {
    return await this.userAccount.findOne({
      where: [{ username }, { password }],
    });
  }

  async auth(username: string, password: string) {
    return await this.authService.validateUser(username, password);
  }

  async login(user: any) {
    return await this.authService.login(user);
  }

  async refreshToken(refreshToken: refreshTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }
}
