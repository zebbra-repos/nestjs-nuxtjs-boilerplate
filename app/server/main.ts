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
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const configService = app.get(ConfigService);

  // security setup
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          blockAllMixedContent: [],
          fontSrc: ["'self'", "https:", "data:"],
          frameAncestors: ["'self'"],
          imgSrc: ["'self'", "data:"],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'", "cdn.jsdelivr.net"],
          scriptSrcAttr: ["'none'"],
          styleSrc: ["'self'", "https: 'unsafe-inline'"],
          upgradeInsecureRequests: [],
        },
      },
    }),
  );
  app.enableCors({
    origin: configService.get<string>("accessControlAllowOrigin"),
  });

  // use pino logger as application logger
  const logger = app.get(Logger);
  app.useLogger(logger);

  // render static nuxtjs application in production
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
