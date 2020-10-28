import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Request } from "express";

import { UserDto } from "../../../users";

import { AuthenticationService } from "../../authentication";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("devise.authentication.secret"),
      passReqToCallback: true,
      session: false,
    });
  }

  public validate(req: Request, payload: UserDto) {
    const lang: string =
      (req.cookies && req.cookies.i18n_redirected) ||
      this.configService.get<string>("fallbackLanguage");

    return this.authenticationService.validateToken(payload, lang);
  }
}
