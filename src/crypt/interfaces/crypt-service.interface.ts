import { User } from '../../users';
import { TokensPair } from '../../interfaces';

export interface CryptService {
  createToken(id: User['id']): TokensPair;
  decodeToken<T>(token: string): null | T;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateRandomId(): string;
}
