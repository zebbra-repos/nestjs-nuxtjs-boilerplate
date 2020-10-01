import { Injectable } from "@nestjs/common";

import { UserDto, UsersService } from "../../users";

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }

  public validateUserToken(payload: UserDto) {
    return this.usersService.findById(payload.id);
  }
}
