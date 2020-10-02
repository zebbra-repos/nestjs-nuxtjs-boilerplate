import { Module } from "@nestjs/common";

import { UsersModule } from "../../users";

import { UnlockResolver } from "./unlock.resolver";
import { UnlockService } from "./unlock.service";

@Module({
  imports: [UsersModule],
  providers: [UnlockResolver, UnlockService],
  exports: [UnlockService],
})
export class UnlockModule {}
