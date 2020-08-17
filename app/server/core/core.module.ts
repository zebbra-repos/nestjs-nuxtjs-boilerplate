import { Module } from "@nestjs/common";

import { sentryModule } from "../core/sentry/sentry.module";
import { SentryProvider } from "../core/sentry/sentry.provider";
import { configModule } from "../core/config.module";
import { graphQLModule } from "../core/graphql.module";
import { loggerModule } from "../core/logger.module";
import { typeormModule } from "../core/typeorm.module";

@Module({
  imports: [
    configModule,
    graphQLModule,
    loggerModule,
    sentryModule,
    typeormModule,
  ],
  providers: [SentryProvider],
})
export class CoreModule {}
