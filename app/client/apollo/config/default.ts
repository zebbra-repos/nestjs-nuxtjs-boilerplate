import { Context } from "@nuxt/types";
import errorLink from "~/apollo/links/error";

export default function ({ redirect, $config }: Context) {
  const httpEndpoint = $config.httpGraphQLEndpoint;
  const wsEndpoint = $config.wsGraphQLEndpoint;

  return {
    link: errorLink(redirect),
    httpEndpoint,
    wsEndpoint,
  };
}
