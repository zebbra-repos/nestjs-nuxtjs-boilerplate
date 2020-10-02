import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { I18nService } from "nestjs-i18n";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

import { AuthenticationService } from "../../authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {
    super({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    });
  }

  public async validate(req: Request, email: string, password: string) {
    const user = await this.authenticationService.validateUser(email, password);

    if (!user) {
      const lang: string =
        (req.cookies && req.cookies.i18n_redirected) ||
        this.configService.get<string>("fallbackLanguage");

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
}
