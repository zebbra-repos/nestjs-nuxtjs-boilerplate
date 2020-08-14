import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const typeormModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    console.log(configService.get<TypeOrmModuleOptions>("database"));
    return configService.get<TypeOrmModuleOptions>("database")!;
  },
});
