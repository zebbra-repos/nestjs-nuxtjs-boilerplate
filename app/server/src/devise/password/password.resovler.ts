import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { I18n, I18nContext } from "nestjs-i18n";

import { EmailRequestDto, MessageResponseDto } from "../devise.dto";

@Resolver("Password")
export class PasswordResolver {
  @Mutation(() => MessageResponseDto, {
    name: "resetPasswordRequest",
    description: "Request user password reset instructions",
  })
  public resetPasswordRequest(
    @Args("data") data: EmailRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    console.log(data);

    return {
      message: i18n.t("devise.passwords.send-instructions"),
    };
  }
}
