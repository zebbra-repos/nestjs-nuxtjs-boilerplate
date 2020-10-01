import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { I18n, I18nContext } from "nestjs-i18n";

import { CreateUserDto } from "../../users";

import { MessageResponseDto } from "../devise.dto";
import { RegistrationService } from "./registration.service";

@Resolver("Registration")
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation(() => MessageResponseDto, {
    name: "signUp",
    description: "Register as a new user",
  })
  async signUp(@Args("data") data: CreateUserDto, @I18n() i18n: I18nContext) {
    await this.registrationService.signUp(data);

    return {
      message: i18n.t("devise.confirmations.send-instructions"),
    };
  }
}
