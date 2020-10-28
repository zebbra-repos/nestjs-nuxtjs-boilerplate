import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { SentryModule } from "@ntegral/nestjs-sentry";

import {
  ConfigModule,
  GraphQLModule,
  HealthController,
  I18nModule,
  LoggerModule,
  MiddlewareModule,
  NuxtController,
  SendgridModule,
  SettingsResolver,
  TypeOrmModule,
} from ".";

@Module({
  imports: [
    ConfigModule,
    I18nModule,
    GraphQLModule,
    LoggerModule,
    SentryModule,
    TypeOrmModule,
    MiddlewareModule,
    SendgridModule,
    TerminusModule,
  ],
  controllers: [HealthController, NuxtController],
  providers: [SettingsResolver],
})
export class CoreModule {}
