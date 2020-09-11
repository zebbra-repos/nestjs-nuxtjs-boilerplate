import { useContext } from "@nuxtjs/composition-api";
import { useCsrfTokenQuery } from "~/apollo/generated-operations";
import { sessionStore } from "~/store";

export default function () {
  const token = sessionStore.csrfToken;
  const { error } = useContext();

  if (!token) {
    const { onResult, onError } = useCsrfTokenQuery();

    onError((err) => {
      if (err) {
        error(err);
      }
    });

    onResult((data) => {
      if (data?.data.csrf.token) {
        sessionStore.updateCsrfToken(data?.data.csrf.token);
      } else {
        error({
          message: "Could not fetch csrf token",
        });
      }
    });
  }
}
