import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { User, UsersService } from "../../users";

import { Devise } from "../devise.entity";

@Injectable()
export class UnlockService {
  private readonly BOTH_STRATEGIES = ["time", "email"];

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  public activeForAuthentication(user: User) {
    const devise = user.devise;

    return !this.lockable || !this.accessLocked(devise);
  }

  // After each sign in, if lockable is active, sets the failedAttempts counter to 0
  public afterSetUser(user: User) {
    if (this.lockable && user.devise.failedAttempts) {
      user.devise.failedAttempts = 0;
      return this.usersService.save(user);
    }

    return user;
  }

  private accessLocked(devise: Devise) {
    return !!devise.lockedAt && !this.lockExpired(devise);
  }

  private lockExpired(devise: Devise) {
    if (this.unlockStrategyEnabled("time")) {
      return (
        devise.lockedAt &&
        devise.lockedAt.getTime() < new Date().getTime() - this.unlockIn
      );
    }

    return false;
  }

  private unlockStrategyEnabled(strategy: string) {
    return (
      this.unlockStrategy === strategy ||
      (this.unlockStrategy === "both" &&
        this.BOTH_STRATEGIES.includes(strategy))
    );
  }

  get inactiveMessage() {
    return "devise.failure.locked";
  }

  get unlockStrategy() {
    return this.configService.get<string>("devise.unlock.strategy") || "both";
  }

  get unlockIn() {
    return this.configService.get<number>("devise.unlock.unlockIn") || 0;
  }

  get lockable() {
    return this.configService.get<boolean>("devise.unlock.enabled") || false;
  }
}
