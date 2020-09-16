import { NestFactory } from "@nestjs/core";
import { CommandModule, CommandService } from "nestjs-command";

import { OrmconfigModule } from "./ormconfig/ormconfig.module";

(async () => {
  const app = await NestFactory.createApplicationContext(OrmconfigModule, {
    logger: false, // no logger
  });

  app.select(CommandModule).get(CommandService).exec();
})();
