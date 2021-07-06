import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashText, UnHashText } from 'src/utilities/text-encrypt';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { refreshTokenDto } from '../../auth/dto/auth.dto';
import { UserAccountDto } from './dto/userAccount.dto';
import { User } from './model/user-account.entity';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(User)
    private userAccountRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async register(data: UserAccountDto) {
    if (!data) {
      return 'datas body reqired !';
    }
    const dto = new UserAccountDto();
    dto.username = data.username;
    dto.email = data.email;
    dto.password = await HashText(data.password);
    dto.phone_number = data.phone_number;

    try {
      return await this.userAccountRepository.save(dto);
    } catch (error) {
      return { message: error.message, code: error.code };
    }
  }

  async login(username: string, password: string) {
    const user = await this.userAccountRepository.findOne({
      where: [{ username }],
    });
    const checkPassword: boolean = await UnHashText(password, user.password);
    return checkPassword
      ? await this.authService.getToken(user)
      : { message: 'user not found', error: 'NOTFOUND' };
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

  async refreshToken(refreshToken: refreshTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }
}
