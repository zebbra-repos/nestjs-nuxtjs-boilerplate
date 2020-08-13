import { SentryModule } from "@ntegral/nestjs-sentry";
import { ConfigService } from "@nestjs/config";

export const sentryModule = SentryModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      dsn: configService.get<string>("sentry.dsn")!,
      debug: configService.get<boolean>("sentry.debug")!,
      environment: configService.get<string>("sentry.environment"),
    };
  },
});
