import { InputType, PickType, ObjectType, Field } from "@nestjs/graphql";

import { User } from "../users";

@InputType({ description: "Email Request DTO model" })
export class EmailRequestDto extends PickType(User, ["email"] as const) {}

@ObjectType({ description: "Message Response DTO model" })
export class MessageResponseDto {
  @Field(() => String, { description: "Custom information message" })
  public message!: string;
}

@ObjectType({ description: "After Action Path DTO model" })
export class AfterActionPathDto {
  @Field(() => String, {
    description: "Path to redirect to after action performed",
  })
  public afterActionPath!: string;
}
