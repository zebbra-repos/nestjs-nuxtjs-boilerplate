import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { I18nService } from "nestjs-i18n";

import { CreateUserDto, User, UsersService } from "../../users";

import { SignUpResponseDto } from "./registration.dto";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
  ) {}

  public async signUp(
    data: CreateUserDto,
    lang: string = "en",
  ): Promise<SignUpResponseDto> {
    const user = await this.usersService.signUp(data, lang);

    const { active, inactiveMessage } = await this.activeForAuthentication(
      user,
    );

    if (active) {
      const message = await this.i18n.t(`${this.translationScope}.signed-up`, {
        lang,
      });

      return {
        message,
        afterActionPath: this.afterSignUpPath,
      };
    }

    const message = await this.i18n.t(
      `${this.translationScope}.signed-up-but-${inactiveMessage}`,
      { lang },
    );

    return {
      message,
      afterActionPath: this.afterInactiveSignUpPath,
    };
  }

  private activeForAuthentication(_user: User) {
    return { active: true, inactiveMessage: "inactive" };
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
