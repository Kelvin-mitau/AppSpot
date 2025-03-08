import { authenticator } from 'otplib';

function generateOTP(secret: string): string {
  return authenticator.generate(secret);
}

function verifyOTP(token: string, secret: string): boolean {
  const isValid = authenticator.check(token, secret);
  //console.log(isValid)
  return isValid
}

export { generateOTP, verifyOTP };