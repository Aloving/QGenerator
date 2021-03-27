import { Module, Provider } from '@nestjs/common';
import { ProviderEnum } from '../enums';

const environment = process.env.NODE_ENV || 'default';

const provider: Provider = {
  provide: ProviderEnum.Env,
  useFactory: () => import(`./${environment}`).then(({ env }) => env),
};

@Module({
  providers: [provider],
  exports: [provider],
})
export class EnvModule {}
