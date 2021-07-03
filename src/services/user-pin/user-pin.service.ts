import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { gPin } from 'src/utilities/pin-generator';
import { DifferentBetween, TimeNow } from 'src/utilities/time';
import { Repository } from 'typeorm';
import { UserMessagerService } from '../user-messager/user-messager.service';
import { UserPinDto } from './dto/user-pin.dto';
import { UserPin } from './model/user-pin.entity';

@Injectable()
export class UserPinService {
  constructor(
    @InjectRepository(UserPin) private userPinRepository: Repository<UserPin>,
    private readonly userMessagerService: UserMessagerService,
  ) {}

  async createUserPin(id: number) {
    const isAvailable = await this.userPinRepository.findOne({
      where: { user_id: id },
    });
    const dto = isAvailable ? isAvailable : new UserPinDto();
    dto.user_pin = await gPin();
    dto.user_id = isAvailable ? isAvailable.user_id : id;
    dto.created_at = TimeNow();
    try {
      return await this.userPinRepository.save(dto);
    } catch (error) {
      return error;
    }
  }

  async isExpired(id: number): Promise<boolean> {
    const selected = await this.userPinRepository.findOne({
      where: { user_id: id },
    });
    if (!selected) {
      return false;
    }
    const now = await TimeNow();
    const diferent = DifferentBetween(selected.created_at, now);
    let result = diferent + 15;
    if (result > 0) {
      return false;
    } else {
      await this.userPinRepository.delete(selected.id);
      return true;
    }
  }

  async UserPinVerification(id: number, phone_number: string) {
    const isExpired = await this.isExpired(id);
    return isExpired
      ? {
          message: 'pin-code not match any record, please request new pin-code',
        }
      : this.userMessagerService.SendPinCode(phone_number);
  }
}
