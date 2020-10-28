import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthenticationModule } from "../authentication";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { LocalStrategy } from "./local/local.strategy";

@Module({
  imports: [PassportModule, AuthenticationModule],
  providers: [LocalStrategy, JwtStrategy],
})
export class StrategyModule {}
