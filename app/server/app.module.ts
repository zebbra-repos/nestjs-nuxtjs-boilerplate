import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CoreModule } from "./core/core.module";

@Module({
  imports: [CoreModule, AuthModule, UsersModule],
})
export class AppModule {}
