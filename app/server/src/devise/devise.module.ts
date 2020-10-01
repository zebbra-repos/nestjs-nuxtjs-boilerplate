import { Module } from "@nestjs/common";

import { AuthenticationModule } from "./authentication";
import { ConfirmationModule } from "./confirmation";
import { PasswordModule } from "./password";
import { RegistrationModule } from "./registration";
import { SessionModule } from "./session";
import { UnlockModule } from "./unlock";

@Module({
  imports: [
    AuthenticationModule,
    ConfirmationModule,
    PasswordModule,
    RegistrationModule,
    SessionModule,
    UnlockModule,
  ],
})
export class DeviseModule {}
