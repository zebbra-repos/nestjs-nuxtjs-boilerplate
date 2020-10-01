import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "../users";
import { DeviseModule } from "../devise";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt/jwt.strategy";
import { LocalStrategy } from "./strategies/local/local.strategy";

@Module({
  imports: [PassportModule, UsersModule, DeviseModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
