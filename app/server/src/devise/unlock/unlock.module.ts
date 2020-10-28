import { Module } from "@nestjs/common";

import { UnlockResolver } from "./unlock.resolver";
import { UnlockService } from "./unlock.service";

@Module({
  providers: [UnlockResolver, UnlockService],
  exports: [UnlockService],
})
export class UnlockModule {}
