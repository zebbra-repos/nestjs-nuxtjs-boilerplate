import { useContext } from "@nuxtjs/composition-api";
import { useCsrfTokenQuery } from "~/apollo/generated-operations";
import { csrfStore } from "~/store";

export default function () {
  const token = csrfStore.csrfToken;
  const { error } = useContext();

  if (!token) {
    const { onResult, onError } = useCsrfTokenQuery();

    onError((err) => {
      if (err) {
        error(err);
      }
    });

    onResult((data) => {
      if (data?.data && data?.data.csrf && data.data?.csrf.token) {
        csrfStore.updateCsrfToken(data?.data.csrf.token);
      } else {
        error({
          message: "Could not fetch csrf token",
        });
      }
    });
  }
}
