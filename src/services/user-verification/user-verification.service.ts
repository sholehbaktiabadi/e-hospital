import { Injectable } from '@nestjs/common';
import { gPin } from 'src/utilities/pin-generator';
import { Env } from 'src/config/env-loader';
import { Twilio } from 'twilio';
import { smsVerifyText } from './dto/user-verify.dto';

@Injectable()
export class UserVerificationService {
  async SendVerification(phoneNumber: string) {
    const { TwilioSid, TwilioAuth, TwilioNumber } = Env();
    const client = new Twilio(TwilioSid, TwilioAuth);
    return await client.messages
      .create({
        from: TwilioNumber,
        to: phoneNumber,
        body: smsVerifyText + (await gPin()),
      })
      .then((resp) => console.log(resp));
  }
}
