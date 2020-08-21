import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import authConfig from "./auth.config";
import databaseConfig from "./database.config";
import sentryConfig from "./sentry.config";
import common from "./environments/common.config";
import development from "./environments/development.config";
import test from "./environments/test.config";
import production from "./environments/production.config";

const load: any[] = [authConfig, databaseConfig, sentryConfig, common];

const NODE_ENV = process.env.NODE_ENV || "development";
switch (NODE_ENV) {
  case "test":
    load.push(test);
    break;
  case "production":
    load.push(production);
    break;
  default:
    load.push(development);
    break;
}

export const configModule = ConfigModule.forRoot({
  ignoreEnvFile: NODE_ENV === "production",
  load,
  isGlobal: true,
  expandVariables: true,
  validationSchema: Joi.object({
    // NODE
    NODE_ENV: Joi.string()
      .valid("development", "test", "production")
      .default("development"),
    PORT: Joi.number().valid(3000, 3001).default(3000),

    // LOGGING
    LOG_LEVEL: Joi.string()
      .valid("trace", "debug", "info", "warn", "error")
      .default("debug"),

    // JWT
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IND: Joi.number().default(3600),

    // TYPEORM
    TYPEORM_URL: Joi.string(),
    TYPEORM_LOGGING: Joi.boolean().default(true),
    TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
    TYPEORM_ENTITIES: Joi.string().required(),
    TYPEORM_MIGRATIONS: Joi.string().required(),
    TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
  }),
});
