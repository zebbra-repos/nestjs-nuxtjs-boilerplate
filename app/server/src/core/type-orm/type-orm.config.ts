import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs("type-orm", (): TypeOrmModuleOptions => {
  const base: TypeOrmModuleOptions = {
    type: "postgres",
    logging: true,
    synchronize: false,
    entities: ["dist/app/server/src/**/*.entity.js"],
  };

  switch (process.env.NODE_ENV) {
    case "test":
      Object.assign(base, {
        autoLoadEntities: true,
        logging: false,
        url:
          process.env.TYPEORM_URL ||
          "postgres://postgres@localhost:5432/nest-nuxt-boilerplate-test",
      });
      break;

    case "development":
      Object.assign(base, {
        url: "postgres://postgres@localhost:5432/nest-nuxt-boilerplate-development",
      });
      break;

    case "production":
      Object.assign(base, {
        url: process.env.TYPEORM_URL,
      });
      break;

    default:
      break;
  }

  return base;
});
