import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { ConfigModule } from "./config/config.module";
import { SentryModule } from "./sentry/sentry.module";
import { GraphQLModule } from "./graphql/graphql.module";
import { LoggerModule } from "./logger/logger.module";
import { TypeOrmModule } from "./type-orm/type-orm.module";
import { MiddlewareModule } from "./middleware/middleware.module";
import { HealthController } from "./health/health.controller";
import { NuxtController } from "./nuxt/nuxt.controller";
import { SettingsResolver } from "./settings/settings.resolver";

@Module({
  imports: [
    ConfigModule,
    GraphQLModule,
    LoggerModule,
    SentryModule,
    TypeOrmModule,
    MiddlewareModule,
    TerminusModule,
  ],
  controllers: [HealthController, NuxtController],
  providers: [SettingsResolver],
})
export class CoreModule {}
