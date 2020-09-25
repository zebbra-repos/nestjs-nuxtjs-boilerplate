import { Query, Resolver } from "@nestjs/graphql";

import pjson from "../../../../../package.json";
import { SettingsDto } from "./settings.dto";

@Resolver("Settings")
export class SettingsResolver {
  @Query(() => SettingsDto, {
    name: "settings",
    description: "Get application settings for frontend",
  })
  getSettings() {
    return {
      version: pjson.version,
    };
  }
}
