import * as crypto from 'crypto';

export const encryptSecretKey = (key: string): string => {
  return crypto.createHash('sha256').update(key).digest('hex');
};