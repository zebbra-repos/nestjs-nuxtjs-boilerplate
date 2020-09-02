import { Query, Resolver } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";
import { SentryModuleOptions } from "@ntegral/nestjs-sentry";

import pjson from "../../package.json";
import { AppSettingsDto } from "./app.dto";

@Resolver("App")
export class AppResolver {
  constructor(private readonly configService: ConfigService) {}

  @Query(() => AppSettingsDto, {
    name: "settings",
    description: "Get application settings for frontend",
  })
  getSettings() {
    const sentry = this.configService.get<SentryModuleOptions>("sentry")!;

    return {
      sentryDsn: sentry.dsn,
      sentryEnvironment: sentry.environment,
      version: pjson.version,
    };
  }
}
