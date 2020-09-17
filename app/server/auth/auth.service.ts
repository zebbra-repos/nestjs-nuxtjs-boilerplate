import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { classToPlain } from "class-transformer";

import { UsersService } from "../users/users.service";
import { CreateUserDto, UserDto } from "../users/users.dto";
import { User } from "../users/users.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }

  validateUserToken(payload: UserDto) {
    return this.usersService.findById(payload.id);
  }

  register(user: CreateUserDto) {
    return this.usersService.register(user);
  }

  login(user: User) {
    return {
      expiresIn: this.configService.get<number>("auth.signOptions.expiresIn")!,
      accessToken: this.jwtService.sign(classToPlain(user)),
    };
  }
}
