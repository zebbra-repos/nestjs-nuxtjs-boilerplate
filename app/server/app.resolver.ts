import { Query, Resolver } from "@nestjs/graphql";

import pjson from "../../package.json";
import { AppSettingsDto } from "./app.dto";

@Resolver("App")
export class AppResolver {
  @Query(() => AppSettingsDto, {
    name: "settings",
    description: "Get application settings for frontend",
  })
  getSettings() {
    return {
      version: pjson.version,
    };
  }
}
