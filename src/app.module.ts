import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { QuestionsModule } from "./questions";
import { UsersModule } from "./users";
import { AnswersModule } from "./answers";
import { DatabaseModule } from "./database";
import { EnvModule } from "./env";
import { HttpInterceptor } from "./HttpInterceptor";
import { AuthModule } from "./auth";
import { CryptModule } from "./crypt";
import { RolesGuard } from "./users/guards";

@Module({
  imports: [
    HttpInterceptor,
    QuestionsModule,
    UsersModule,
    AnswersModule,
    DatabaseModule,
    EnvModule,
    AuthModule,
    CryptModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
