import { onError } from "apollo-link-error";
import { logErrorMessages } from "@vue/apollo-util";
import { Context, NuxtError } from "@nuxt/types";
import { ValidationError } from "class-validator";
import { notificationStore } from "~/store";
import { ErrorNames } from "~/utils/enums/error-names.enum";
import { CustomValidationError } from "~/types";

export default function errorLink(
  redirect: Context["redirect"],
  nuxtError: (params: NuxtError) => void,
) {
  return onError((error) => {
    let handled = false;

    if (error.graphQLErrors) {
      const unauthorized = error.graphQLErrors.find(
        ({ message }) => message === "Unauthorized",
      );

      const path = unauthorized && unauthorized.path && unauthorized.path[0];
      if (unauthorized && path !== "login") {
        notificationStore.show({
          color: "error",
          message: "Please login",
          timeout: 3000,
        });
        return redirect("/login");
      }

      const validationError = error.graphQLErrors.find(
        ({ message }) => message === "Unprocessable Entity Exception",
      );

      if (validationError) {
        if (validationError.extensions?.exception?.response?.message) {
          handled = true;
          const errors =
            validationError.extensions?.exception?.response?.message;

          validationError.name = ErrorNames.VALIDATION;
          validationError.message = errors.map((error: ValidationError) => {
            const validationError: CustomValidationError = {
              property: error.property,
              value: error.value,
              message: error.constraints
                ? Object.values(error.constraints).join(", ")
                : "",
            };
            return validationError;
          });
        }
      }
    }

    if (error.networkError) {
      nuxtError({
        message: error.networkError.message,
        path: error.networkError.name,
        statusCode: 500,
      });
    }

    if (!handled) {
      logErrorMessages(error);
    }
  });
}
