import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { I18nLang } from "nestjs-i18n";

import { CreateUserDto } from "../../users";

import { SignUpResponseDto } from "./registration.dto";
import { RegistrationService } from "./registration.service";

@Resolver("Registration")
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation(() => SignUpResponseDto, {
    name: "signUp",
    description: "Register as a new user",
  })
  public signUp(@Args("data") data: CreateUserDto, @I18nLang() lang: string) {
    return this.registrationService.signUp(data, lang);
  }
}
