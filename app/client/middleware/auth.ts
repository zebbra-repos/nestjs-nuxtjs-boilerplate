import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { useLogout } from "~/composable/useSession";
import { sessionStore } from "~/store";

export default defineNuxtMiddleware(async ({ app, redirect, route }) => {
  const token = app.$apolloHelpers.getToken();

  if (!token) {
    return await useLogout(
      app,
      redirect,
      app.i18n.t("devise.failure.unauthenticated") as string,
      false,
      route.path,
    );
  }

  if (sessionStore.expired) {
    return await useLogout(
      app,
      redirect,
      app.i18n.t("devise.failure.timeout") as string,
      false,
      route.path,
    );
  }
});
