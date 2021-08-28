import { NestFactory } from "@nestjs/core";
import * as helmet from "helmet";

import { FirstStartModule } from "./scripts/first-start";

async function bootstrap() {
  const app = await NestFactory.create(FirstStartModule);
  app.use(helmet());

  console.log("asdasd");

  await app.listen(7000);
}
bootstrap();
