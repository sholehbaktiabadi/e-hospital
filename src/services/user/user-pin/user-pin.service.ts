import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { gPin } from 'src/utilities/pin-generator';
import { DifferentBetween, TimeNow } from 'src/utilities/time';
import { Repository } from 'typeorm';
import { UserAccountService } from '../user-account/user-account.service';
import { UserMessagerService } from '../../user-messager/user-messager.service';
import { UserPinDto } from './dto/user-pin.dto';
import { UserPin } from './model/user-pin.entity';

@Injectable()
export class UserPinService {
  constructor(
    @InjectRepository(UserPin) private userPinRepository: Repository<UserPin>,
    private readonly userMessagerService: UserMessagerService,
    private readonly userAccountService: UserAccountService,
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

  async isExpired(id: number): Promise<{ expired: boolean; pinCode: string }> {
    const selected = await this.userPinRepository.findOne({
      where: { user_id: id },
    });
    if (!selected) {
      return {
        expired: true,
        pinCode: 'not found, try to request pin verification',
      };
    }
    const now = await TimeNow();
    const diferent = DifferentBetween(selected.created_at, now);
    const result = diferent + 15;
    if (result > 0) {
      return { expired: false, pinCode: selected.user_pin };
    } else {
      await this.userPinRepository.delete(selected.id);
      return { expired: true, pinCode: selected.user_pin };
    }
  }

  async userPinNotification(id: number, phone_number: string) {
    const { expired, pinCode } = await this.isExpired(id);
    return expired
      ? {
          message: 'pin-code not match any record, please request new pin-code',
        }
      : this.userMessagerService.SendPinCode(phone_number, pinCode);
  }

  async userVerify(pinCode: string, id: number) {
    const selected = await this.userPinRepository.findOne({
      where: { user_id: id },
    });
    const isSamePin: boolean = selected.user_pin === pinCode;
    return isSamePin
      ? await this.userAccountService.userVerification(id)
      : { message: 'pin_code not match' };
  }
}
