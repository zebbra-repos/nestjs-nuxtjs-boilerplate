import { join } from "path";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, UnprocessableEntityException } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "nestjs-pino";
import { ConfigService } from "@nestjs/config";
import { ValidationError } from "class-validator";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(helmet());

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
