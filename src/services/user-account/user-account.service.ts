import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { refreshTokenDto } from '../auth/dto/auth.dto';
import { UserVerificationService } from '../user-verification/user-verification.service';
import { UserAccountDto } from './dto/userAccount.dto';
import { User } from './model/user-account.entity';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(User)
    private userAccount: Repository<User>,
    private readonly authService: AuthService,
    private readonly userVerifService: UserVerificationService,
  ) {}

  async registerUser(data: UserAccountDto) {
    if (!data) {
      return 'datas body reqired !';
    }
    const dto = new UserAccountDto();
    dto.username = data.username;
    dto.email = data.email;
    dto.password = data.password;
    try {
      return await this.userAccount.save(dto);
    } catch (error) {
      return error;
    }
  }

  async userVerification(phoneNumber: string, message: string) {
    return await this.userVerifService.SendVerification(phoneNumber, message);
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
