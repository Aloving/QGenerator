import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";
import { v4 as uuid } from "uuid";

import { CryptService as ICryptService } from "./interfaces/crypt-service.interface";

@Injectable()
export class CryptService implements ICryptService {
  async hashPassword(password: string): Promise<string> {
    // @todo research about the second argument
    return hash(password, 10);
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted);
  }

  generateRandomId(): string {
    return uuid();
  }
}
