import { join } from "path";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "nestjs-pino";

import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const configService = app.get(ConfigService);

  // use pino logger as application logger
  const logger = app.get(Logger);
  app.useLogger(logger);

  // render static nextjs application in production
  if (configService.get<boolean>("production")) {
    app.useStaticAssets(join(__dirname, "..", "client"));
  }

  // use class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(configService.get<number>("port")!);
  logger.log(
    `Nest application is running on: ${await app.getUrl()}`,
    "NestApplication",
  );
}

bootstrap();
