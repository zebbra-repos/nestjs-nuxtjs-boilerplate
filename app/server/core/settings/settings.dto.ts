import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType({ description: "Application settings for frontend" })
export class SettingsDto {
  @Field({ description: "Application version" })
  version!: string;
}
