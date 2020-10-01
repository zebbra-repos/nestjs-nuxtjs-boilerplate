import { Injectable } from "@nestjs/common";

import { UsersService, CreateUserDto } from "../../users";

@Injectable()
export class RegistrationService {
  constructor(private readonly usersService: UsersService) {}

  public signUp(payload: CreateUserDto) {
    return this.usersService.signUp(payload);
  }
}
