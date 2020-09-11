import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType({ description: "Application settings for frontend" })
export class AppSettingsDto {
  @Field({ description: "Application version" })
  version!: string;
}

@ObjectType({ description: "Csrf token" })
export class CsrfTokenDto {
  @Field({ description: "Token" })
  token!: string;
}
