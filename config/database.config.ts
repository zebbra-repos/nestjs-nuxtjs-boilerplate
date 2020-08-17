import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs(
  "database",
  (): TypeOrmModuleOptions => ({
    type: "postgres",
    url:
      process.env.TYPEORM_URL ||
      "TYPEORM_URL=postgres://postgres@localhost:5432/nest-nuxt-boilerplate-development",
    entities: [process.env.TYPEORM_ENTITIES!],
    logging: process.env.TYPEORM_LOGGING === "true",
    synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    autoLoadEntities: false,
  }),
);
