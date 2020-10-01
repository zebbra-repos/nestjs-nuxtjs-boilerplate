import { Query, Resolver } from "@nestjs/graphql";

import { CsrfToken } from "../../common/decorators";

import { CsrfTokenDto } from "./middleware.dto";

@Resolver("Middleware")
export class MiddlewareResolver {
  @Query(() => CsrfTokenDto, {
    name: "csrf",
    description: "Fetch a new csrf token",
  })
  public getCsrfToken(@CsrfToken() token: string) {
    return {
      token,
    };
  }
}
