import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";

import { User, UserDto, UsersService } from "../../users";

import { ConfirmationService } from "../confirmation/confirmation.service";
import { UnlockService } from "../unlock/unlock.service";
import { Devise } from "../devise.entity";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Devise)
    private readonly deviseRepository: Repository<Devise>,
    private readonly usersService: UsersService,
    private readonly confirmationService: ConfirmationService,
    private readonly unlockService: UnlockService,
    private readonly i18n: I18nService,
  ) {}

  // Validation callback for local strategy
  public async validateUser(email: string, password: string, lang: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException(null, await this.notFoundMessage(lang));
    }

    await this.afterSetUser(user, lang);
    await this.unlockService.afterSetUser(user);
    return user;
  }

  // Validation callback for jwt strategy
  public async validateUserToken(payload: UserDto, lang: string) {
    const user = await this.usersService.findById(payload.id);

    if (!user) {
      const message = await this.i18n.t("devise.failure.timeout", {
        lang,
      });

      throw new UnauthorizedException(null, message);
    }

    await this.afterSetUser(user, lang);
    return user;
  }

  // Deny user access whenever their account is not active yet
  public async afterSetUser(user: User, lang: string) {
    const { active, message } = await this.activeForAuthentication(user);

    if (!active) {
      throw new UnauthorizedException(
        null,
        await this.i18n.t(`devise.failure.${message}`, { lang }),
      );
    }

    return user;
  }

  public async activeForAuthentication(user: User) {
    // Make sure user is linked to a devise
    user = await this.ensureDevice(user);

    let active = this.confirmationService.activeForAuthentication(user);
    if (!active) {
      return {
        active,
        message: this.confirmationService.inactiveMessage,
      };
    }

    active = this.unlockService.activeForAuthentication(user);
    if (!active) {
      return {
        active,
        message: this.unlockService.inactiveMessage,
      };
    }

    return {
      active,
    };
  }

  // If devise does not exists on user we create it on the fly and
  private ensureDevice(user: User) {
    if (user.devise) {
      return user;
    }

    user.devise = this.deviseRepository.create();
    return this.usersService.save(user);
  }

  private async notFoundMessage(lang: string) {
    return this.i18n.t("devise.failure.not-found-in-database", {
      lang,
      args: {
        authenticationKeys: await this.i18n.t("user.email", { lang }),
      },
    });
  }
}
