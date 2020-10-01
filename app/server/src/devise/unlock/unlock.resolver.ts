import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { I18n, I18nContext } from "nestjs-i18n";

import { EmailRequestDto, MessageResponseDto } from "../devise.dto";

@Resolver("Unlock")
export class UnlockResolver {
  @Mutation(() => MessageResponseDto, {
    name: "unlockAccountRequest",
    description: "Request account unlock instructions",
  })
  public unlockAccountRequest(
    @Args("data") data: EmailRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    console.log(data);

    return {
      message: i18n.t("devise.unlocks.send-instructions"),
    };
  }
}
