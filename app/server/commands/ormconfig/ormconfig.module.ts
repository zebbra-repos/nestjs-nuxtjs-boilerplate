import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";

import { configModule } from "../../config/config.module";
import { OrmconfigCommand } from "./ormconfig.command";

@Module({
  imports: [configModule, CommandModule],
  providers: [OrmconfigCommand],
})
export class OrmconfigModule {}
