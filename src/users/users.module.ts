import { Module, forwardRef } from "@nestjs/common";

import { DatabaseModule } from "../database";
import { usersProviders } from "./users.providers";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { CryptModule } from "../crypt";

@Module({
  imports: [CryptModule, forwardRef(() => DatabaseModule)],
  exports: [UsersService],
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController],
})
export class UsersModule {}
