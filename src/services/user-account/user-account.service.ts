import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UserAccountDto } from './dto/userAccount.dto';
import { User } from './model/user-account.entity';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(User)
    private userAccount: Repository<User>,
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
    try {
      return await this.userAccount.save(dto);
    } catch (error) {
      return error;
    }
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
}
