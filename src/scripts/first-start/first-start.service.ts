import { Inject, Injectable, OnApplicationBootstrap } from "@nestjs/common";

import { UsersService } from "../../users";
import { ProviderEnum } from "../../enums";
import { IEnv } from "../../env";

@Injectable()
export class FirstStartService implements OnApplicationBootstrap {
  constructor(
    private usersService: UsersService,
    @Inject(ProviderEnum.Env) private env: IEnv
  ) {}

  onApplicationBootstrap() {
    console.log(this.env);
  }
}
