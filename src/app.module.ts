import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions';
import { UsersModule } from './users';
import { AnswersModule } from './answers';
import { DatabaseModule } from './database';
import { EnvModule } from './env';
import { HttpInterceptor } from './HttpInterceptor';
import { AuthModule } from './auth';
import { CryptModule } from './crypt';
import { RolesGuard } from './users/guards';
import { QuestionProposalsModule } from './question-proposals';
import { DefaultUserInterceptor } from './author/interceptors';
// import { AuthorModule } from './author';

@Module({
  imports: [
    HttpInterceptor,
    QuestionsModule,
    QuestionProposalsModule,
    UsersModule,
    AnswersModule,
    DatabaseModule,
    EnvModule,
    AuthModule,
    CryptModule,
    // AuthorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DefaultUserInterceptor,
    // },
  ],
})
export class AppModule {}
