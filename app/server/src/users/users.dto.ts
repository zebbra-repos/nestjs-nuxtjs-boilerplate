import {
  PickType,
  ObjectType,
  InputType,
  PartialType,
  OmitType,
  Field,
} from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

import { User } from "./users.entity";

@ObjectType({ description: "User DTO model" })
export class UserDto extends PickType(
  User,
  ["id", "firstName", "lastName", "email"] as const,
  ObjectType,
) {}

@InputType({ description: "Create User DTO model" })
export class CreateUserDto extends PickType(
  User,
  ["firstName", "lastName", "email"] as const,
  InputType,
) {
  @Field({ description: "User password" })
  @IsString()
  @MinLength(8)
  public password!: string;
}

@InputType({ description: "Update User DTO model" })
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["password"] as const),
) {}
