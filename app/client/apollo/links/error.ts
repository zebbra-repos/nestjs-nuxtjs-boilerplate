import { onError } from "apollo-link-error";
import { Context } from "@nuxt/types";
import { Observable } from "apollo-link";
import consola from "consola";

import { csrfStore, sessionStore } from "~/store";
import { ErrorNames } from "~/utils/enums/error-names.enum";
import { CsrfTokenDocument } from "~/apollo/generated-operations";
import { useLogout } from "~/composable/useSession";

export default function errorLink(ctx: Context) {
  const { redirect, error: nuxtError, app, route } = ctx;

  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    let handled = false;

    if (graphQLErrors) {
      const unauthorized = graphQLErrors.find(
        ({ extensions }) => extensions && extensions.exception.status === 401,
      );

      if (unauthorized) {
        handled = true;
        const path = unauthorized.path && unauthorized.path[0];

        if (path !== "signIn") {
          const token = app.$apolloHelpers.getToken();
          const message =
            token && sessionStore.expired
              ? app.i18n.t("devise.failure.timeout")
              : app.i18n.t("devise.failure.unauthenticated");

          useLogout(app, redirect, message as string, true, route.path);
          return;
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

              csrfStore.updateCsrfToken(response.data.csrf.token);

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
        consola.error(graphQLErrors as any);
      }
      if (networkError) {
        consola.error(networkError as any);
      }
    }
  });
}
