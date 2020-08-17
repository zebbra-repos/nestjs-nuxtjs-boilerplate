import { SentryModule, SentryModuleOptions } from "@ntegral/nestjs-sentry";
import { ConfigService } from "@nestjs/config";

export const sentryModule = SentryModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    configService.get<SentryModuleOptions>("sentry")!,
});
