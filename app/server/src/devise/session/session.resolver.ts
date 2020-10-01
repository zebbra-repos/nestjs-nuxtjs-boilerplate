import { Mutation, Resolver, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";

import { CurrentUser } from "../../common/decorators";
import { User, CreateUserDto } from "../../users";

import { LocalAuthGuard } from "../authentication";
import {
  SignInRequestDto,
  SignInResponseDto,
  EmailRequestDto,
  MessageResponseDto,
} from "./session.dto";
import { SessionService } from "./session.service";

@Resolver("Session")
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => MessageResponseDto, {
    name: "signUp",
    description: "Register as a new user",
  })
  async signUp(@Args("data") data: CreateUserDto, @I18n() i18n: I18nContext) {
    await this.sessionService.signUp(data);

    return {
      message: i18n.t("devise.confirmations.send-instructions"),
    };
  }

  @Mutation(() => SignInResponseDto, {
    name: "signIn",
    description: "Login as user",
  })
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Args("data") _data: SignInRequestDto,
    @CurrentUser() user: User,
  ) {
    return await this.sessionService.signIn(user);
  }

  @Mutation(() => MessageResponseDto, {
    name: "resetPasswordRequest",
    description: "Request user password reset instructions",
  })
  resetPasswordRequest(
    @Args("data") data: EmailRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    console.log(data);

    return {
      message: i18n.t("devise.passwords.send-instructions"),
    };
  }

  @Mutation(() => MessageResponseDto, {
    name: "confirmAccountRequest",
    description: "Request account confirmation instructions",
  })
  confirmAccountRequest(
    @Args("data") data: EmailRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    console.log(data);

    return {
      message: i18n.t("devise.confirmations.send-instructions"),
    };
  }

  @Mutation(() => MessageResponseDto, {
    name: "unlockAccountRequest",
    description: "Request account unlock instructions",
  })
  unlockAccountRequest(
    @Args("data") data: EmailRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    console.log(data);

    return {
      message: i18n.t("devise.unlocks.send-instructions"),
    };
  }
}
