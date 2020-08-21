import { Module } from "@nestjs/common";

import { sentryModule } from "./sentry/sentry.module";
import { SentryProvider } from "./sentry/sentry.provider";
import { configModule } from "./config.module";
import { graphQLModule } from "./graphql.module";
import { loggerModule } from "./logger.module";
import { typeormModule } from "./typeorm.module";

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
