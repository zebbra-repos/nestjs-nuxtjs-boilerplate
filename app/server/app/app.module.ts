import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { configModule } from "./config.module";
import { graphQLModule } from "./graphql.module";
import { loggerModule } from "./logger.module";
import { sentryModule } from "./sentry.module";
import { typeormModule } from "./typeorm.module";
import { SentryProvider } from "./sentry.provider";

@Module({
  imports: [
    configModule,
    graphQLModule,
    loggerModule,
    sentryModule,
    typeormModule,
    AuthModule,
    UsersModule,
  ],
  providers: [SentryProvider],
})
export class AppModule {}
