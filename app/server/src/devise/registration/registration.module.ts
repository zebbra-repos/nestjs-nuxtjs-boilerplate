import { Module } from "@nestjs/common";

import { UsersModule } from "../../users";

import { AuthenticationModule } from "../authentication/authentication.module";
import { SessionModule } from "../session/session.module";
import { RegistrationResolver } from "./registration.resolver";
import { RegistrationService } from "./registration.service";

@Module({
  imports: [UsersModule, AuthenticationModule, SessionModule],
  providers: [RegistrationResolver, RegistrationService],
})
export class RegistrationModule {}
