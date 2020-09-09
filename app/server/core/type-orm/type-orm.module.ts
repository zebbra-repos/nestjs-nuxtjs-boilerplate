import {
  TypeOrmModule as TypeOrm,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    TypeOrm.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>("database")!,
    }),
  ],
})
export class TypeOrmModule {}
