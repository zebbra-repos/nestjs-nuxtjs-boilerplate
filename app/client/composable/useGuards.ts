import { useContext } from "@nuxtjs/composition-api";
import { useResult } from "@vue/apollo-composable";
import { notificationStore, sessionStore } from "~/store";

export function useRequireQueryParameter(
  attribute: string,
  message: string,
  path: string,
) {
  if (process.client) {
    const {
      query,
      redirect,
      app: { router },
    } = useContext();

    const result = useResult(query, null, (data) => data[attribute]);
    if (!result.value) {
      notificationStore.show({
        message,
        color: "info",
        timeout: -1,
      });
      if (router) {
        router.push(path);
      } else {
        redirect(path);
      }
    }
  }
}

export function useRequireNoAuthentication() {
  const { app, redirect } = useContext();

  if (
    process.client &&
    app.$apolloHelpers.getToken() &&
    !sessionStore.expired
  ) {
    notificationStore.show({
      color: "info",
      message: app.i18n.t("devise.failure.already-authenticated") as string,
      timeout: 3000,
    });

    if (app.router) {
      app.router.push("/");
    } else {
      redirect("/");
    }
  }
}
