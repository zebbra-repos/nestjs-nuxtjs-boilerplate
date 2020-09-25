import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { useLogout } from "~/composable/useSession";
import { sessionStore } from "~/store";

export default defineNuxtMiddleware(async ({ app, redirect }) => {
  const token = app.$apolloHelpers.getToken();

  if (!token) {
    return await useLogout(
      app,
      redirect,
      app.i18n.t("devise.failure.unauthenticated") as string,
    );
  }

  if (sessionStore.expired) {
    return await useLogout(
      app,
      redirect,
      app.i18n.t("devise.failure.timeout") as string,
    );
  }
});
