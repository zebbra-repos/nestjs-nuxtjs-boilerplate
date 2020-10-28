import { Injectable, UnauthorizedException } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

import { UserDto, UsersService } from "../../users";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly i18n: I18nService,
    private readonly usersService: UsersService,
  ) {}

  // Validation callback for local strategy
  public async validateUser(email: string, password: string, lang: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      const message = await this.i18n.t(
        "devise.failure.not-found-in-database",
        {
          lang,
          args: {
            authenticationKeys: await this.i18n.t("user.email", { lang }),
          },
        },
      );

      throw new UnauthorizedException(null, message);
    }

    return user;
  }

  // Validation callback for jwt strategy
  public async validateToken(payload: UserDto, lang: string) {
    const user = await this.usersService.findById(payload.id);

    if (!user) {
      const message = await this.i18n.t("devise.failure.timeout", {
        lang,
      });

      throw new UnauthorizedException(null, message);
    }

    return user;
  }
}
