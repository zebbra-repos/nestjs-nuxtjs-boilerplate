import { promises as fs } from "fs";
import { Command } from "nestjs-command";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class OrmconfigCommand {
  constructor(private readonly configService: ConfigService) {}

  // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
  @Command({
    command: "create",
    describe: "create the ormconfig.json file on the fly",
    autoExit: true,
  })
  async create() {
    const ormconfig = this.configService.get<TypeOrmModuleOptions>("database");
    const migrationSettings = {
      migrations: ["db/migrate/*.ts"],
      cli: {
        migrationsDir: "db/migrate",
      },
    };
    const settings = {
      ...ormconfig,
      ...migrationSettings,
    };
    await fs.writeFile("ormconfig.json", JSON.stringify(settings, null, 2));
  }
}
