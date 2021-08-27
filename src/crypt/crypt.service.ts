import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";
import { v4 as uuid } from "uuid";
import { JwtService } from "@nestjs/jwt";

import { CryptService as ICryptService } from "./interfaces/crypt-service.interface";
import { User } from "../users";

@Injectable()
export class CryptService implements ICryptService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    // @todo research about the second argument
    return hash(password, 10);
  }

  decodeToken<T>(token: string) {
    return this.jwtService.decode(token) as T;
  }

  createToken(id: User["id"]) {
    const accessToken = this.jwtService.sign({ id });
    const refreshToken = this.generateRandomId();

    return { accessToken, refreshToken };
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted);
  }

  generateRandomId(): string {
    return uuid();
  }
}
