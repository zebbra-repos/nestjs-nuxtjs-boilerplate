import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { I18n, I18nContext } from "nestjs-i18n";
import { ConfigService } from "@nestjs/config";

import { CreateUserDto } from "../../users";

import { AuthenticationService } from "../authentication/authentication.service";
import { SessionService } from "../session/session.service";
import { RegistrationService } from "./registration.service";
import { SignUpResponseDto } from "./registration.dto";

@Resolver("Registration")
export class RegistrationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly sessionService: SessionService,
    private readonly registrationService: RegistrationService,
    private readonly configService: ConfigService,
  ) {}

  @Mutation(() => SignUpResponseDto, {
    name: "signUp",
    description: "Register as a new user",
  })
  public async signUp(
    @Args("data") data: CreateUserDto,
    @I18n() i18n: I18nContext,
  ) {
    const user = await this.registrationService.signUp(data);
    const {
      active,
      message,
    } = await this.authenticationService.activeForAuthentication(user);

    let response: SignUpResponseDto;

    if (active) {
      const session = await this.sessionService.signIn(user);

      response = {
        message: await i18n.t(`${this.translationScope}.signed-up`),
        afterActionPath: this.afterSignUpPath,
        ...session,
      };
    } else {
      response = {
        message: await i18n.t(
          `${this.translationScope}.signed-up-but-${message}`,
        ),
        afterActionPath: this.afterInactiveSignUpPath,
      };
    }

    return response;
  }

  get translationScope() {
    return "devise.registrations";
  }

  get afterSignUpPath() {
    return this.configService.get<string>(
      "devise.registration.afterSignUpPath",
    )!;
  }

  get afterInactiveSignUpPath() {
    return this.configService.get<string>(
      "devise.registration.afterInactiveSignUpPath",
    )!;
  }
}
