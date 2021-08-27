import { TokensPair } from "./tokens-pair.interface";
import { JwtPayload } from "./jwt-payload.interface";
import { LoginDto } from "../dto/login.dto";
import { TokenRefreshDto } from "../dto/token-refresh.dto";
import { User } from "../../users";

export interface AuthService {
  createToken(id: User["id"]): TokensPair;
  validateUser(payload: JwtPayload): Promise<User>;
  login(loginPayload: LoginDto): Promise<TokensPair>;
  refreshToken(refreshPayload: TokenRefreshDto): Promise<TokensPair>;
  decodeToken<T>(token: string): null | T;
  getUserByToken(token: string): Promise<User | undefined>;
}
