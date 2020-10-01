import { Module } from "@nestjs/common";

import { AuthenticationModule } from "./authentication";
import { SessionModule } from "./session";

@Module({
  imports: [AuthenticationModule, SessionModule],
})
export class DeviseModule {}
