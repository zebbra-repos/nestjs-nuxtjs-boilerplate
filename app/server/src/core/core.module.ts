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
  PubSubModule,
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
    PubSubModule,
    SendgridModule,
    TerminusModule,
  ],
  controllers: [HealthController, NuxtController],
  providers: [SettingsResolver],
})
export class CoreModule {}
