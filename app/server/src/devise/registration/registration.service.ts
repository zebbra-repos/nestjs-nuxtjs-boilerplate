import { Injectable } from "@nestjs/common";

import { UsersService, CreateUserDto } from "../../users";

@Injectable()
export class RegistrationService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(payload: CreateUserDto) {
    return await this.usersService.signUp(payload);
  }
}
