import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions';
import { UsersModule } from './users';
import { AnswersModule } from './answers';
import { DatabaseModule } from './database';
import { EnvModule } from './env';

@Module({
  imports: [
    QuestionsModule,
    UsersModule,
    AnswersModule,
    DatabaseModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
