import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { User } from "../../users";

import { Devise } from "../devise.entity";

@Injectable()
export class ConfirmationService {
  constructor(private readonly configService: ConfigService) {}

  public activeForAuthentication(user: User) {
    const devise = user.devise;

    return (
      !this.confirmable ||
      !this.confirmationRequired(devise) ||
      this.confirmed(devise) ||
      this.confirmationPeriodValid(devise)
    );
  }

  private confirmationRequired(devise: Devise) {
    return !this.confirmed(devise);
  }

  private confirmed(devise: Devise) {
    return !!devise.confirmedAt;
  }

  private confirmationPeriodValid(devise: Devise) {
    if (this.allowUnconfirmedAccessFor === undefined) {
      return true;
    }

    if (this.allowUnconfirmedAccessFor === 0) {
      return false;
    }

    return (
      !!devise.confirmationSentAt &&
      devise.confirmationSentAt.getTime() >=
        new Date().getTime() - this.allowUnconfirmedAccessFor
    );
  }

  get inactiveMessage() {
    return "unconfirmed";
  }

  get allowUnconfirmedAccessFor() {
    return this.configService.get<number>("devise.confirmation.confirmWithin");
  }

  get confirmable() {
    return (
      this.configService.get<boolean>("devise.confirmation.enabled") || false
    );
  }
}
