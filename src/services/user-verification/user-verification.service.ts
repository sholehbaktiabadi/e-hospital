import { Injectable } from '@nestjs/common';
import { Env } from 'src/config/env-loader';
import { Twilio } from 'twilio';

@Injectable()
export class UserVerificationService {
  async SendVerification(phoneNumber: string, message: string) {
    const { TwilioSid, TwilioAuth, TwilioNumber } = Env();
    const client = new Twilio(TwilioSid, TwilioAuth);
    return await client.messages
      .create({
        from: TwilioNumber,
        to: phoneNumber,
        body: message,
      })
      .then((resp) => console.log(resp));
  }
}
