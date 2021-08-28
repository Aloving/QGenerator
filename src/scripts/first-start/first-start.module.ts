import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database";
import { EnvModule } from "../../env";
import { AuthModule } from "../../auth";
import { CryptModule } from "../../crypt";
import { UsersModule } from "../../users";
import { FirstStartService } from "./first-start.service";

@Module({
  imports: [DatabaseModule, EnvModule, AuthModule, CryptModule, UsersModule],
  providers: [FirstStartService],
})
export class FirstStartModule {}
