import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
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

  @Post('verify')
  async checkExpiration(@Request() req) {
    return await this.userPinService.UserPinVerification(
      req.user.id,
      req.user.phone_number,
    );
  }
}
