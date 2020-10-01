import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { classToPlain } from "class-transformer";

import { User } from "../../users";

@Injectable()
export class SessionService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  signIn(user: User) {
    return {
      expiresIn: this.configService.get<number>(
        "devise.authentication.signOptions.expiresIn",
      )!,
      accessToken: this.jwtService.sign(classToPlain(user)),
    };
  }
}
