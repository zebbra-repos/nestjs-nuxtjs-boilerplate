import {
  TypeOrmModule as TypeOrm,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const TypeOrmModule = TypeOrm.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    configService.get<TypeOrmModuleOptions>("type-orm")!,
});
