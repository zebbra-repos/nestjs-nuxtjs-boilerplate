import { onError } from "apollo-link-error";
import { logErrorMessages } from "@vue/apollo-util";
import { Context } from "@nuxt/types";
import { ValidationError } from "class-validator";
import { Observable } from "apollo-link";

import { notificationStore, sessionStore } from "~/store";
import { ErrorNames } from "~/utils/enums/error-names.enum";
import { CustomValidationError } from "~/types";
import { CsrfTokenDocument } from "~/apollo/generated-operations";

export default function errorLink(ctx: Context) {
  const { redirect, error: nuxtError, app } = ctx;

  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    let handled = false;

    if (graphQLErrors) {
      const unauthorized = graphQLErrors.find(
        ({ extensions }) => extensions && extensions.exception.status === 401,
      );

      if (unauthorized) {
        handled = true;

        const path = unauthorized.path && unauthorized.path[0];
        if (path !== "login") {
          notificationStore.show({
            color: "error",
            message: "Please login",
            timeout: 3000,
          });
          return redirect("/login");
        }
      }

      const validation = graphQLErrors.find(
        ({ extensions }) => extensions && extensions.exception.status === 422,
      );

      if (validation) {
        handled = true;

        if (validation.extensions?.exception?.response?.message) {
          const errors = validation.extensions?.exception?.response?.message;

          validation.name = ErrorNames.VALIDATION;
          validation.message = errors.map((error: ValidationError) => {
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

    if (networkError) {
      const error = networkError as any;

      if (
        error.result &&
        error.statusCode === 400 &&
        error.result.message === ErrorNames.CSRF
      ) {
        handled = true;

        return new Observable((observer) => {
          const refresh = async () => {
            try {
              const response = await app.apolloProvider.defaultClient.query({
                query: CsrfTokenDocument,
              });

              sessionStore.updateCsrfToken(response.data.csrf.token);

              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };

              return forward(operation).subscribe(subscriber);
            } catch (error) {
              return observer.error(error);
            }
          };

          refresh();
        });
      }

      nuxtError({
        message: networkError.message,
        path: networkError.name,
        statusCode: 500,
      });
    }

    if (!handled) {
      if (graphQLErrors) {
        logErrorMessages(graphQLErrors);
      }
      if (networkError) {
        logErrorMessages(networkError);
      }
    }
  });
}
