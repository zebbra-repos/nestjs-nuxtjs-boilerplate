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
  case "development":
    load.push(development);
    break;
  case "production":
    load.push(production);
    break;
  default:
    break;
}

/**
 * Required env variables
 *
 * JWT_SECRET
 */

export const configModule = ConfigModule.forRoot({
  ignoreEnvFile: NODE_ENV === "production",
  load,
  isGlobal: true,
  expandVariables: true,
  validationSchema: Joi.object({
    // COMMON
    NODE_ENV: Joi.string()
      .valid("development", "test", "production")
      .default("development"),
    PORT: Joi.number().valid(3000, 3001).default(3000),
    LOG_LEVEL: Joi.string()
      .valid("trace", "debug", "info", "warn", "error")
      .default("debug"),
    ACCESS_CONTROL_ALLOW_ORIGIN: Joi.string().default("http://localhost:5000"),

    // AUTH
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.number().default(3600),

    // DATABASE
    TYPEORM_CONNECTION: Joi.string().default("postgres"),
    TYPEORM_URL: Joi.string(),
    TYPEORM_LOGGING: Joi.boolean().default(true),
    TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
    TYPEORM_ENTITIES: Joi.string().default("dist/app/server/**/*.entity.js"),
    TYPEORM_MIGRATIONS: Joi.string().default("db/migrate/*.ts"),
    TYPEORM_MIGRATIONS_DIR: Joi.string().default("db/migrate"),

    // SENTRY
    SENTRY_DSN: Joi.string(),
    SENTRY_DISABLED: Joi.boolean().default(false),
    SENTRY_DEBUG: Joi.boolean().default(false),
    SENTRY_ENVIRONMENT: Joi.string().default("development"),
  }),
});
