import { Mutation, Resolver, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UserDto, CreateUserDto } from "../users/users.dto";
import { CurrentUser } from "../decorators/current-user.decorator";
import { User } from "../users/users.entity";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { LoginUserResponseDto, LoginUserRequestDto } from "./auth.dto";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserDto, {
    name: "register",
    description: "Register as a new user",
  })
  async registerUser(@Args("createUserInput") createUserInput: CreateUserDto) {
    return (
      await this.authService.register(createUserInput)
    ).toResponseObject();
  }

  @Mutation(() => LoginUserResponseDto, {
    name: "login",
    description: "Login as user",
  })
  @UseGuards(LocalAuthGuard)
  async loginUser(
    @Args("loginUserInput") _loginUserInput: LoginUserRequestDto,
    @CurrentUser() user: User,
  ) {
    return await this.authService.login(user);
  }
}
