import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { configModule } from "../config/config.module";
import { sentryModule } from "./sentry/sentry.module";
import { SentryProvider } from "./sentry/sentry.provider";
import { graphQLModule } from "./graphql.module";
import { loggerModule } from "./logger.module";
import { typeormModule } from "./typeorm.module";
import { HealthController } from "./health.controller";
import { ServceStaticNuxtModule } from "./serve-static-nuxt/serve-static-nuxt.module";

@Module({
  imports: [
    configModule,
    graphQLModule,
    loggerModule,
    sentryModule,
    typeormModule,
    ServceStaticNuxtModule,
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [SentryProvider],
})
export class CoreModule {}
