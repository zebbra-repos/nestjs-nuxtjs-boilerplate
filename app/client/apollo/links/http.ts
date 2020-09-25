import { createHttpLink } from "apollo-link-http";
import { csrfStore } from "~/store";

export default function httpLink(uri: string, isDev: boolean) {
  return createHttpLink({
    uri,
    useGETForQueries: true,
    credentials: isDev ? "include" : "same-origin",
    fetch: (uri, options) => {
      if (options?.headers && csrfStore.csrfToken) {
        (options.headers as any)["XSRF-TOKEN"] = csrfStore.csrfToken;
      }

      return fetch(uri, options);
    },
  });
}
