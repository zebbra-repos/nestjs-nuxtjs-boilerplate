import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { UserDto } from "../../../../users";

import { AuthenticationService } from "../../authentication.service";

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
    });
  }

  async validate(payload: UserDto) {
    const user = await this.authenticationService.validateUserToken(payload);
    if (!user) {
      throw new UnauthorizedException(null, "Invalid jwt");
    }
    return user;
  }
}
