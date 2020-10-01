import { Injectable } from "@nestjs/common";

import { DeviseService } from "../devise";
import { UserDto, UsersService } from "../users";

@Injectable()
export class AuthService {
  constructor(
    private readonly deviseService: DeviseService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.comparePassword(password))) {
      return this.deviseService.validate(user);
    }
    return null;
  }

  validateUserToken(payload: UserDto) {
    return this.usersService.findById(payload.id);
  }
}
