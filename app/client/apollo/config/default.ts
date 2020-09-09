import { Context } from "@nuxt/types";
import { ApolloLink } from "apollo-link";

import errorLink from "~/apollo/links/error";
import httpLink from "~/apollo/links/http";

export default function ({ redirect, $config, isStatic, error }: Context) {
  let httpEndpoint = $config.httpGraphQLEndpoint;
  let wsEndpoint = $config.wsGraphQLEndpoint;

  if (process.client && isStatic && $config.sameOriginForGQL) {
    httpEndpoint = `${window.location.protocol}//${window.location.host}/graphql`;
    wsEndpoint = httpEndpoint.replace(/^http/, "ws");
  }

  return {
    defaultHttpLink: false,
    link: ApolloLink.from([errorLink(redirect, error), httpLink(httpEndpoint)]),
    httpEndpoint,
    wsEndpoint,
  };
}
