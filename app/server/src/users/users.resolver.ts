import { Query, Resolver, Args, Int } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CurrentUser } from "../common/decorators";
import { JwtAuthGuard } from "../devise/authentication/strategies/jwt/jwt-auth.guard";

import { UserDto } from "./users.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserDto, {
    name: "profile",
    description: "Get current user profile",
  })
  @UseGuards(JwtAuthGuard)
  public getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => UserDto, {
    name: "user",
    description: "Get user by ID",
  })
  @UseGuards(JwtAuthGuard)
  public getUser(@Args("id", { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }
}
