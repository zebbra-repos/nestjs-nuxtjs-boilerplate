import { Context } from "@nuxt/types";
import errorLink from "~/apollo/links/error";

export default function ({ redirect }: Context) {
  const httpEndpoint =
    process.env.HTTP_GRAPHQL_ENDPOINT || "http://localhost:3000/graphql";

  const wsEndpoint =
    process.env.WS_GRAPHQL_ENDPOINT || "ws://localhost:3000/graphql";

  return {
    link: errorLink(redirect),
    httpEndpoint,
    wsEndpoint,
  };
}
