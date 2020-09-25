import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "../users/users.module";
import { DeviseModule } from "../devise/devise.module";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { AuthService } from "./auth.service";

@Module({
  imports: [PassportModule, UsersModule, DeviseModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
