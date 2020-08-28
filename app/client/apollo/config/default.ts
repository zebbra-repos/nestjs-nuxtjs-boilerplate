import { Context } from "@nuxt/types";
import errorLink from "~/apollo/links/error";

export default function ({ isStatic, isClient, redirect }: Context) {
  const httpEndpoint =
    isStatic && isClient
      ? window.location.protocol + "//" + window.location.host + "/graphql"
      : "http://localhost:3000/graphql";

  const wsEndpoint = httpEndpoint.replace(/^https?/, "ws");

  return {
    link: errorLink(redirect),
    httpEndpoint,
    wsEndpoint,
  };
}
