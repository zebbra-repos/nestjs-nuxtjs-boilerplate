import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "../../users";

import { ConfirmationModule } from "../confirmation/confirmation.module";
import { UnlockModule } from "../unlock/unlock.module";
import { Devise } from "../devise.entity";

import { AuthenticationService } from "./authentication.service";
import { LocalStrategy, JwtStrategy } from "./strategies";

@Module({
  imports: [
    PassportModule,
    UsersModule,
    TypeOrmModule.forFeature([Devise]),
    ConfirmationModule,
    UnlockModule,
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
