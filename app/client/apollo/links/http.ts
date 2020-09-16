import { createHttpLink } from "apollo-link-http";
import { sessionStore } from "~/store";

export default function httpLink(uri: string, isDev: boolean) {
  return createHttpLink({
    uri,
    useGETForQueries: true,
    credentials: isDev ? "include" : "same-origin",
    fetch: (uri, options) => {
      if (options?.headers && sessionStore.csrfToken) {
        (options.headers as any)["XSRF-TOKEN"] = sessionStore.csrfToken;
      }

      return fetch(uri, options);
    },
  });
}
