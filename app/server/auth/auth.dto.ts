import { InputType, PickType, ObjectType, Field, Int } from "@nestjs/graphql";

import { CreateUserDto } from "../users/users.dto";

@InputType({ description: "Login User DTO model" })
export class LoginUserRequestDto extends PickType(CreateUserDto, [
  "email",
  "password",
] as const) {}

@ObjectType({ description: "Login User Response DTO model" })
export class LoginUserResponseDto {
  @Field(() => Int, { description: "JWT expires in" })
  expiresIn!: number;

  @Field(() => String, { description: "JSON web token" })
  accessToken!: string;
}
