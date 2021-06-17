import { ConfigModule as Config } from "@nestjs/config";
import * as Joi from "joi";

import deviseConfig from "../../devise/devise.config";
import pubsubConfig from "../pubsub/pubsub.config";
import sendgridConfig from "../sendgrid/sendgrid.config";
import sentryConfig from "../sentry/sentry.config";
import typeOrmConfig from "../type-orm/type-orm.config";

import common from "./environments/common.config";
import development from "./environments/development.config";
import test from "./environments/test.config";
import production from "./environments/production.config";

const load: any[] = [
  typeOrmConfig,
  deviseConfig,
  pubsubConfig,
  sendgridConfig,
  sentryConfig,
  common,
];

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

export const ConfigModule = Config.forRoot({
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

    // DEVISE > AUTHENTICATION
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.number().default(60 * 60), // in seconds!

    // CSRF
    CSRF_SECRET: Joi.string().required(),

    // DATABASE
    TYPEORM_CONNECTION: Joi.string().default("postgres"),
    TYPEORM_URL: Joi.string(),
    TYPEORM_LOGGING: Joi.boolean().default(true),
    TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
    TYPEORM_ENTITIES: Joi.string().default("dist/app/server/**/*.entity.js"),
    TYPEORM_MIGRATIONS: Joi.string().default("db/migrate/*.ts"),
    TYPEORM_MIGRATIONS_DIR: Joi.string().default("db/migrate"),

    // SENDGRID
    SENDGRID_API_KEY: Joi.string(),
    SENDGRID_DEFAULTS_FROM: Joi.string(),

    // SENTRY
    SENTRY_DSN: Joi.string(),
    SENTRY_DISABLED: Joi.boolean().default(false),
    SENTRY_DEBUG: Joi.boolean().default(false),
    SENTRY_ENVIRONMENT: Joi.string().default("development"),
  }),
});
