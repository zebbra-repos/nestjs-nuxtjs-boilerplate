import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { ConfigModule } from "./config/config.module";
import { SentryModule } from "./sentry/sentry.module";
import { GraphQLModule } from "./graphql/graphql.module";
import { LoggerModule } from "./logger/logger.module";
import { TypeOrmModule } from "./type-orm/type-orm.module";
import { ServceStaticModule } from "./serve-static/serve-static.module";
import { MiddlewareModule } from "./middleware/middleware.module";
import { HealthController } from "./health/health.controller";

@Module({
  imports: [
    ConfigModule,
    GraphQLModule,
    LoggerModule,
    SentryModule,
    TypeOrmModule,
    MiddlewareModule,
    ServceStaticModule,
    TerminusModule,
  ],
  controllers: [HealthController],
})
export class CoreModule {}
