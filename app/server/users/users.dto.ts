import {
  PickType,
  ObjectType,
  InputType,
  PartialType,
  OmitType,
} from "@nestjs/graphql";

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
  ["firstName", "lastName", "email", "password"] as const,
  InputType,
) {}

@InputType({ description: "Update User DTO model" })
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["password"] as const),
) {}
