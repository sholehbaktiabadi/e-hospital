import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../user-auth/auth.service';
import { refreshTokenDto } from '../user-auth/dto/auth.dto';
import { UserAccountDto } from './dto/userAccount.dto';
import { User } from './model/user-account.entity';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(User)
    private userAccountRepository: Repository<User>,
    private readonly authService: AuthService,
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
      return await this.userAccountRepository.save(dto);
    } catch (error) {
      return { message: error.message, code: error.code };
    }
  }

  async userVerification(id: number) {
    const selected = await this.userAccountRepository.findOne({
      where: { id },
    });
    if (!selected) {
      return { message: 'user not found' };
    }
    selected.isVerified = true;
    return this.userAccountRepository.save(selected);
  }

  async login(username: string, password: string) {
    const user = await this.userAccountRepository.findOne({
      where: [{ username, password }],
    });
    console.log(user);
    if (!user) {
      return { message: 'user not found', error: 'NOTFOUND' };
    } else {
      return await this.authService.getToken(user);
    }
  }

  async refreshToken(refreshToken: refreshTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }
}
