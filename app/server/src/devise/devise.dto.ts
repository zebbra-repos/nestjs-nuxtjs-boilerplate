import { InputType, PickType, ObjectType, Field, Int } from "@nestjs/graphql";

import { CreateUserDto } from "../users";

@InputType({ description: "Sign In Request DTO model" })
export class SignInRequestDto extends PickType(CreateUserDto, [
  "email",
  "password",
] as const) {}

@ObjectType({ description: "Sign In Response DTO model" })
export class SignInResponseDto {
  @Field(() => Int, { description: "JWT expires in" })
  expiresIn!: number;

  @Field(() => String, { description: "JSON web token" })
  accessToken!: string;
}

@InputType({ description: "Email Request DTO model" })
export class EmailRequestDto extends PickType(SignInRequestDto, [
  "email",
] as const) {}

@ObjectType({ description: "Message Response DTO model" })
export class MessageResponseDto {
  @Field(() => String, { description: "Custom information message" })
  message!: string;
}
