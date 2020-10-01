import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "../../users";
import { AuthenticationService } from "./authentication.service";
import { LocalStrategy, JwtStrategy } from "./strategies";

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
