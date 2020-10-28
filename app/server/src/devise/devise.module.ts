import { Module } from "@nestjs/common";

import { AuthenticationModule } from "./authentication";
import { ConfirmationModule } from "./confirmation";
import { PasswordModule } from "./password";
import { RegistrationModule } from "./registration";
import { SessionModule } from "./session";
import { StrategyModule } from "./strategy";
import { UnlockModule } from "./unlock";

@Module({
  imports: [
    AuthenticationModule,
    ConfirmationModule,
    PasswordModule,
    RegistrationModule,
    SessionModule,
    StrategyModule,
    UnlockModule,
  ],
})
export class DeviseModule {}
