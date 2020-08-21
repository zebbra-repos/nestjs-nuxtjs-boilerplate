import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { configModule } from "../config/config.module";
import { sentryModule } from "./sentry/sentry.module";
import { SentryProvider } from "./sentry/sentry.provider";
import { graphQLModule } from "./graphql.module";
import { loggerModule } from "./logger.module";
import { typeormModule } from "./typeorm.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    configModule,
    graphQLModule,
    loggerModule,
    sentryModule,
    typeormModule,
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [SentryProvider],
})
export class CoreModule {}
