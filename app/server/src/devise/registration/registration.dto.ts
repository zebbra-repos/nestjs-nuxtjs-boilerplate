import { ObjectType, IntersectionType, PartialType } from "@nestjs/graphql";

import { MessageResponseDto, AfterActionPathDto } from "../devise.dto";
import { SignInResponseDto } from "../session";

@ObjectType({ description: "Sign Up Response DTO model" })
export class SignUpResponseDto extends IntersectionType(
  IntersectionType(MessageResponseDto, AfterActionPathDto),
  PartialType(SignInResponseDto),
) {}
