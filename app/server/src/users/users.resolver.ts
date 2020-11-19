import {
  Query,
  Resolver,
  Args,
  Int,
  Mutation,
  Subscription,
} from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";

import { PUB_SUB } from "../core";
import { CurrentUser } from "../common/decorators";
import { JwtAuthGuard } from "../devise/strategy/jwt/jwt-auth.guard";

import { PingResponseDto, UserDto } from "./users.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private readonly usersService: UsersService,
  ) {}

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

  @Mutation(() => UserDto, {
    name: "ping",
    description: "Ping currently signed in user",
  })
  @UseGuards(JwtAuthGuard)
  public pingUser(@CurrentUser() user: User) {
    // publish for current user only. user will be used
    // in subscription filter
    this.pubSub.publish("userAlive", { status: "ok", user });
    return user;
  }

  // Example subscription for authorized users only
  // @UseGuards(JwtAuthGuard) makes sure that the websocket
  // connection is authorized and the user is set on context.req.user
  // we publish event only to the current user by filtering with payload.user
  @Subscription(() => PingResponseDto, {
    filter: (payload, _variables, { req: { user } }) =>
      payload.user.id === user.id,
    resolve: (payload) => ({ status: payload.status }),
  })
  @UseGuards(JwtAuthGuard)
  userAlive() {
    return this.pubSub.asyncIterator("userAlive");
  }
}
