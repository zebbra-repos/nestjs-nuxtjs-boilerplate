import { ConfigModule } from "@nestjs/config";
import * as Joi from "@hapi/joi";

import authConfig from "config/auth.config";
import databaseConfig from "config/database.config";
import common from "config/environments/common.config";
import development from "config/environments/development.config";
import test from "config/environments/test.config";
import production from "config/environments/production.config";

const load: any[] = [authConfig, databaseConfig];

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

load.push(common);

export const configModule = ConfigModule.forRoot({
  ignoreEnvFile: NODE_ENV === "production",
  load,
  isGlobal: true,
  expandVariables: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid("development", "test", "production")
      .default("development"),
    PORT: Joi.number().valid(3000, 3001).default(3000),
    LOG_LEVEL: Joi.string()
      .valid("trace", "debug", "info", "warn", "error")
      .default("debug"),
    JWT_SECRET: Joi.string().required(),
    TYPEORM_URL: Joi.string().required(),
    TYPEORM_LOGGING: Joi.boolean().default(true),
    TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
    TYPEORM_ENTITIES: Joi.string().required(),
    TYPEORM_ENTITIES_DIR: Joi.string(),
    TYPEORM_MIGRATIONS: Joi.string().required(),
    TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
  }),
});
