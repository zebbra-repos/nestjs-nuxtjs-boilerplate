import { Module } from "@nestjs/common";

import { CoreModule } from "./core";
import { AuthModule } from "./auth";
import { DeviseModule } from "./devise";
import { UsersModule } from "./users";

@Module({
  imports: [CoreModule, AuthModule, UsersModule, DeviseModule],
})
export class AppModule {}
