import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user-auth/jwt-auth.guard';
import { UserPinService } from './user-pin.service';

@UseGuards(JwtAuthGuard)
@Controller('user-pin')
export class UserPinController {
  constructor(private userPinService: UserPinService) {}

  @Post()
  async createUserPin(@Request() req) {
    return await this.userPinService.createUserPin(req.user.id);
  }

  @Post('notification')
  async checkExpiration(@Request() req) {
    return await this.userPinService.userPinNotification(
      req.user.id,
      req.user.phone_number,
    );
  }

  @Post('verify')
  async userVerify(@Body('pin_code') pinCode: string, @Request() req) {
    return await this.userPinService.userVerify(pinCode, req.user.id);
  }
}
