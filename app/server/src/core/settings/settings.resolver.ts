import { ConfigService } from "@nestjs/config";
import { Query, Resolver } from "@nestjs/graphql";

import pjson from "../../../../../package.json";

import { SettingsDto } from "./settings.dto";

@Resolver("Settings")
export class SettingsResolver {
  constructor(private readonly configService: ConfigService) {}

  @Query(() => SettingsDto, {
    name: "settings",
    description: "Get application settings for frontend",
  })
  public getSettings(): SettingsDto {
    return {
      version: pjson.version,
      devise: {
        confirmation:
          this.configService.get<boolean>("devise.confirmation.enabled") ||
          false,
        password:
          this.configService.get<boolean>("devise.password.enabled") || false,
        registration:
          this.configService.get<boolean>("devise.registration.enabled") ||
          false,
        unlock:
          this.configService.get<boolean>("devise.unlock.enabled") || false,
      },
    };
  }
}
