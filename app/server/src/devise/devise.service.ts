import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { classToPlain } from "class-transformer";

import { UserDto, CreateUserDto } from "../users/users.dto";
import { User } from "../users/users.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class DeviseService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validate(user: UserDto) {
    return await user;
  }

  signUp(user: CreateUserDto) {
    return this.usersService.signUp(user);
  }

  signIn(user: User) {
    return {
      expiresIn: this.configService.get<number>("auth.signOptions.expiresIn")!,
      accessToken: this.jwtService.sign(classToPlain(user)),
    };
  }
}
