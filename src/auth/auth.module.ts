import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "./auth.controller";
import { UsersModule } from "../users";
import { CryptModule } from "../crypt";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    CryptModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  exports: [AuthService, JwtStrategy],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
