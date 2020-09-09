import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";

import { ConfigModule } from "../../core/config/config.module";
import { OrmconfigCommand } from "./ormconfig.command";

@Module({
  imports: [ConfigModule, CommandModule],
  providers: [OrmconfigCommand],
})
export class OrmconfigModule {}
