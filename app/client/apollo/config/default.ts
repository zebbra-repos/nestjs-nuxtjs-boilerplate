import { Context } from "@nuxt/types";
import { ApolloLink } from "apollo-link";

import errorLink from "~/apollo/links/error";
import httpLink from "~/apollo/links/http";

export default function (ctx: Context) {
  const { $config, isDev } = ctx;

  return {
    defaultHttpLink: false,
    link: ApolloLink.from([
      errorLink(ctx),
      httpLink($config.apollo.httpGraphQLEndpoint, isDev),
    ]),
    httpEndpoint: $config.apollo.httpGraphQLEndpoint,
    wsEndpoint: $config.apollo.wsGraphQLEndpoint,
  };
}
