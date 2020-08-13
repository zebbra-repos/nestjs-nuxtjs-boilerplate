import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs(
  "database",
  (): TypeOrmModuleOptions => ({
    type: "postgres",
    url: process.env.TYPEORM_URL,
    entities: [process.env.TYPEORM_ENTITIES!],
    logging: process.env.TYPEORM_LOGGING === "true",
    synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    autoLoadEntities: false,
  }),
);
