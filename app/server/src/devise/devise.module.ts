import { Module } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { UsersModule } from "../users/users.module";
import { DeviseService } from "./devise.service";
import { DeviseResolver } from "./devise.resolver";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<JwtModuleOptions>("auth")!,
    }),
    UsersModule,
  ],
  providers: [DeviseService, DeviseResolver],
  exports: [DeviseService],
})
export class DeviseModule {}
