import { Context } from "@nuxt/types";
import errorLink from "~/apollo/links/error";

export default function ({ redirect, $config, isStatic }: Context) {
  let httpEndpoint = $config.httpGraphQLEndpoint;
  let wsEndpoint = $config.wsGraphQLEndpoint;

  if (process.client && isStatic && $config.sameOriginForGQL) {
    httpEndpoint = `${window.location.protocol}//${window.location.host}/graphql`;
    wsEndpoint = httpEndpoint.replace(/^http/, "ws");
  }

  return {
    link: errorLink(redirect),
    httpEndpoint,
    wsEndpoint,
  };
}
