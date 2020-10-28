import { Mutation, Resolver, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CurrentUser } from "../../common/decorators";
import { LocalAuthGuard } from "../strategy/local/local-auth.guard";
import { User } from "../../users";

import { SignInRequestDto, SignInResponseDto } from "./session.dto";
import { SessionService } from "./session.service";

@Resolver("Session")
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => SignInResponseDto, {
    name: "signIn",
    description: "Login as user",
  })
  @UseGuards(LocalAuthGuard)
  public signIn(
    @Args("data") _data: SignInRequestDto,
    @CurrentUser() user: User,
  ) {
    return this.sessionService.signIn(user);
  }
}
