import * as securePin from 'secure-pin';

export async function gPin() {
  return securePin.generatePinSync(6);
}
