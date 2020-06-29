import { Module } from "@nestjs/common";
import { loggerModule } from "./logger.module";

@Module({
  imports: [loggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
