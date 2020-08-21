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
    await fs.writeFile(
      "ormconfig.json",
      JSON.stringify(
        this.configService.get<TypeOrmModuleOptions>("database"),
        null,
        2,
      ),
    );
  }
}
