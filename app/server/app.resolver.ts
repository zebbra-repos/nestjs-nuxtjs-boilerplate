import { Query, Resolver, ObjectType, Field } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";
import { SentryModuleOptions } from "@ntegral/nestjs-sentry";

import pjson from "../../package.json";

@ObjectType({ description: "Application settings for frontend" })
class AppSettingsDto {
  @Field({ description: "Sentry dsn" })
  sentryDsn!: string;

  @Field({ description: "Sentry environment" })
  sentryEnvironment!: string;
}

@Resolver("App")
export class AppResolver {
  constructor(private readonly configService: ConfigService) {}

  @Query(() => String, {
    name: "version",
    description: "Get application version",
  })
  getVersion() {
    return pjson.version;
  }

  @Query(() => AppSettingsDto, {
    name: "settings",
    description: "Get application settings for frontend",
  })
  getSettings() {
    const sentry = this.configService.get<SentryModuleOptions>("sentry")!;

    return {
      sentryDsn: sentry.dsn,
      sentryEnvironment: sentry.environment,
    };
  }
}
