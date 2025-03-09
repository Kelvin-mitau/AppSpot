import { authenticator } from 'otplib';

function generateOTP(secret: string): string {
  // Set options for authenticator
  authenticator.options = { digits: 6, step: 300 };
  return authenticator.generate(secret);
}

function verifyOTP(token: string, secret: string): boolean {
  // Set options for authenticator
  authenticator.options = { digits: 6, step: 300 };
  const isValid = authenticator.check(token, secret);
  return isValid;
}

export { generateOTP, verifyOTP };