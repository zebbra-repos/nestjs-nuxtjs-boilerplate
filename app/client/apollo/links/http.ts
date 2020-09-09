import { createHttpLink } from "apollo-link-http";

export default function httpLink(uri: string) {
  return createHttpLink({
    uri,
    useGETForQueries: true,
    credentials: "include",
  });
}
