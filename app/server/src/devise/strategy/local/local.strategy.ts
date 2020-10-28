import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Request } from "express";

import { AuthenticationService } from "../../authentication";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {
    super({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    });
  }

  public validate(req: Request, email: string, password: string) {
    const lang: string =
      (req.cookies && req.cookies.i18n_redirected) ||
      this.configService.get<string>("fallbackLanguage");

    return this.authenticationService.validateUser(email, password, lang);
  }
}
