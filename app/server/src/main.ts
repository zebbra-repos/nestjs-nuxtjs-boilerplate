import { NestFactory } from "@nestjs/core";
import { ValidationPipe, UnprocessableEntityException } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "nestjs-pino";
import { ConfigService } from "@nestjs/config";
import { ValidationError } from "class-validator";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const configService = app.get(ConfigService);

  // use pino logger as application logger
  const logger = app.get(Logger);
  app.useLogger(logger);

  // use cookie-parser
  app.use(cookieParser());

  // use class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new UnprocessableEntityException(validationErrors),
    }),
  );

  await app.listen(configService.get<number>("port")!);
  logger.log(
    `Nest application is running on: ${await app.getUrl()}`,
    "NestApplication",
  );
}

bootstrap();
