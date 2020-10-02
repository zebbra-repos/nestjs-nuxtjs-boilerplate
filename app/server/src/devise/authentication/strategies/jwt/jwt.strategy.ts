import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { I18nService } from "nestjs-i18n";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

import { UserDto } from "../../../../users";

import { AuthenticationService } from "../../authentication.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("devise.authentication.secret"),
      passReqToCallback: true,
      session: false,
    });
  }

  public async validate(req: Request, payload: UserDto) {
    const user = await this.authenticationService.validateUserToken(payload);

    if (!user) {
      const lang: string =
        (req.cookies && req.cookies.i18n_redirected) ||
        this.configService.get<string>("fallbackLanguage");

      const message = await this.i18n.t("devise.failure.timeout", {
        lang,
      });

      throw new UnauthorizedException(null, message);
    }

    return user;
  }
}
