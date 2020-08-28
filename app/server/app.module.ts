import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CoreModule } from "./core/core.module";
import { AppResolver } from "./app.resolver";

@Module({
  imports: [CoreModule, AuthModule, UsersModule],
  providers: [AppResolver],
})
export class AppModule {}
