import { InputType, PickType, ObjectType, Field } from "@nestjs/graphql";

import { User } from "../users";

@InputType({ description: "Email Request DTO model" })
export class EmailRequestDto extends PickType(User, ["email"] as const) {}

@ObjectType({ description: "Message Response DTO model" })
export class MessageResponseDto {
  @Field(() => String, { description: "Custom information message" })
  message!: string;
}
