import { Module } from "@nestjs/common";

import { UsersModule } from "../../users";

import { RegistrationResolver } from "./registration.resolver";
import { RegistrationService } from "./registration.service";

@Module({
  imports: [UsersModule],
  providers: [RegistrationResolver, RegistrationService],
})
export class RegistrationModule {}
