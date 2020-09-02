import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType({ description: "Application settings for frontend" })
export class AppSettingsDto {
  @Field({ description: "Sentry dsn" })
  sentryDsn!: string;

  @Field({ description: "Sentry environment" })
  sentryEnvironment!: string;

  @Field({ description: "Application version" })
  version!: string;
}
