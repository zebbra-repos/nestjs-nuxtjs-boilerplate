import { Module } from "@nestjs/common";

import { CoreModule } from "./core";
import { DeviseModule } from "./devise";
import { UsersModule } from "./users";

@Module({
  imports: [CoreModule, UsersModule, DeviseModule],
})
export class AppModule {}
