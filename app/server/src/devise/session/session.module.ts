import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";

import { UsersModule } from "../../users";

import { SessionResolver } from "./session.resolver";
import { SessionService } from "./session.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<JwtModuleOptions>("devise.authentication")!,
    }),
    UsersModule,
  ],
  providers: [SessionResolver, SessionService],
})
export class SessionModule {}
