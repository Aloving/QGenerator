import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from '../users';
import { EnvModule } from '../env';
import { DefaultUserInterceptor } from './interceptors';

@Module({
  imports: [UsersModule, EnvModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: DefaultUserInterceptor }],
  exports: [DefaultUserInterceptor],
})
export class AuthorModule {}
