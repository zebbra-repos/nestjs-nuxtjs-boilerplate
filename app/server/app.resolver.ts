import { Query, Resolver } from "@nestjs/graphql";
import pjson from "../../package.json";

@Resolver("App")
export class AppResolver {
  @Query(() => String, {
    name: "version",
    description: "Get application version",
  })
  getVersion() {
    return pjson.version;
  }
}
