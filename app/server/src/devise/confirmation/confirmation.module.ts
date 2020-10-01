import { Module } from "@nestjs/common";

import { ConfirmationResolver } from "./confirmation.resolver";
import { ConfirmationService } from "./confirmation.service";

@Module({
  providers: [ConfirmationResolver, ConfirmationService],
})
export class ConfirmationModule {}
