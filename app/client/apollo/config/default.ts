import { Context } from "@nuxt/types";
import { ApolloLink } from "apollo-link";

import errorLink from "~/apollo/links/error";
import httpLink from "~/apollo/links/http";

export default function ({ redirect, $config, error, isDev }: Context) {
  return {
    defaultHttpLink: false,
    link: ApolloLink.from([
      errorLink(redirect, error),
      httpLink($config.apollo.httpGraphQLEndpoint, isDev),
    ]),
    httpEndpoint: $config.apollo.httpGraphQLEndpoint,
    wsEndpoint: $config.apollo.wsGraphQLEndpoint,
  };
}
