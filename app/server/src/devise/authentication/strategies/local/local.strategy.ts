import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthenticationService } from "../../authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  public async validate(email: string, password: string) {
    const user = await this.authenticationService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(null, "Invalid email or password");
    }
    return user;
  }
}
