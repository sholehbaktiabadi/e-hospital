import { Injectable } from '@nestjs/common';
import { gPin } from 'src/utilities/pin-generator';
import { Env } from 'src/config/env-loader';
import { Twilio } from 'twilio';
import { smsVerifyText } from './dto/user-verify.dto';

@Injectable()
export class UserMessagerService {
  async SendPinCode(phoneNumber: string, pinCode: string) {
    const { TwilioSid, TwilioAuth, TwilioNumber } = Env();
    const client = new Twilio(TwilioSid, TwilioAuth);
    try {
      const resp = await client.messages.create({
        from: TwilioNumber,
        to: phoneNumber,
        body: smsVerifyText + pinCode,
      });
      return { status: resp.status, from: resp.from, to: resp.to };
    } catch (err) {
      return {
        error: err.message,
        stack: err.stack,
        code: err.code,
      };
    }
  }
}
