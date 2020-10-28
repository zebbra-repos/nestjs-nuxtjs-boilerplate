import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType({ description: "Csrf token" })
export class CsrfTokenDto {
  @Field({ description: "Token" })
  public token!: string;
}
