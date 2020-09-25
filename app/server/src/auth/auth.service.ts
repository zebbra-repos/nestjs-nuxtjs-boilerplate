import { Injectable } from "@nestjs/common";

import { UsersService } from "../users/users.service";
import { UserDto } from "../users/users.dto";
import { DeviseService } from "../devise/devise.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly deviseService: DeviseService,
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
