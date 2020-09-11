import { Query, Resolver } from "@nestjs/graphql";

import pjson from "../../package.json";
import { AppSettingsDto, CsrfTokenDto } from "./app.dto";
import { CsrfToken } from "./common/decorators/csrf-token.decorator";

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

  @Query(() => CsrfTokenDto, {
    name: "csrf",
    description: "Fetch a new csrf token",
  })
  getCsrfToken(@CsrfToken() token: string) {
    return {
      token,
    };
  }
}
