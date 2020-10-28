import { Module } from "@nestjs/common";

import { PasswordResolver } from "./password.resovler";
import { PasswordService } from "./password.service";

@Module({
  providers: [PasswordResolver, PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
