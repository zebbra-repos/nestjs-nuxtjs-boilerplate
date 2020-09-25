import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CoreModule } from "./core/core.module";
import { DeviseModule } from "./devise/devise.module";

@Module({
  imports: [CoreModule, AuthModule, UsersModule, DeviseModule],
})
export class AppModule {}
