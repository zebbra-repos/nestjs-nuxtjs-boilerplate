import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType({ description: "Devise configurations" })
export class DeviseConfigDto {
  @Field({ description: "Is the account confirmable" })
  public confirmation!: boolean;

  @Field({ description: "Is the account password editable" })
  public password!: boolean;

  @Field({ description: "Is the account registerable" })
  public registration!: boolean;

  @Field({ description: "Is the account lockable" })
  public unlock!: boolean;
}

@ObjectType({ description: "Application settings for frontend" })
export class SettingsDto {
  @Field({ description: "Application version" })
  public version!: string;

  @Field({ description: "Devise configurations" })
  public devise!: DeviseConfigDto;
}
