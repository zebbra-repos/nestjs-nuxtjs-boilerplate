import { Query, Resolver, Args, Int } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/current-user.decorator";
import { User } from "./users.entity";
import { UsersService } from "./users.service";
import { UserDto } from "./users.dto";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserDto, {
    name: "profile",
    description: "Get current user profile",
  })
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: User) {
    return user.toResponseObject();
  }

  @Query(() => UserDto, {
    name: "user",
    description: "Get user by ID",
  })
  @UseGuards(JwtAuthGuard)
  async getUser(@Args("id", { type: () => Int }) id: number) {
    return (await this.usersService.findById(id)).toResponseObject();
  }
}
