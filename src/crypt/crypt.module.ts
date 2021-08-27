import { Module } from "@nestjs/common";

import { CryptService } from "./crypt.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: "secretKey",
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [CryptService],
  exports: [CryptService],
})
export class CryptModule {}
