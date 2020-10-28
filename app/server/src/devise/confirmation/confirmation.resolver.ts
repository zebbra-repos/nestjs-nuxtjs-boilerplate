import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { I18n, I18nContext } from "nestjs-i18n";

import { EmailRequestDto, MessageResponseDto } from "../devise.dto";

@Resolver("Confirmation")
export class ConfirmationResolver {
  @Mutation(() => MessageResponseDto, {
    name: "confirmAccountRequest",
    description: "Request account confirmation instructions",
  })
  public confirmAccountRequest(
    @Args("data") data: EmailRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    console.log(data);

    return {
      message: i18n.t("devise.confirmations.send-instructions"),
    };
  }
}
