import { Module } from "@nestjs/common";
import { loggerModule } from "./logger.module";
import { serveStaticModule } from "./serve-static.module";

@Module({
  imports: [loggerModule, serveStaticModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
