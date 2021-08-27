import { TokensPair } from "../../interfaces";
import { JwtPayload } from "./jwt-payload.interface";
import { LoginDto } from "../dto/login.dto";
import { TokenRefreshDto } from "../dto/token-refresh.dto";
import { User } from "../../users";

export interface AuthService {
  validateUser(payload: JwtPayload): Promise<User>;
  login(loginPayload: LoginDto): Promise<TokensPair>;
  refreshToken(refreshPayload: TokenRefreshDto): Promise<TokensPair>;
  getUserByToken(token: string): Promise<User | undefined>;
}
