import { NuxtAppOptions } from "@nuxt/types";
import { useContext } from "@nuxtjs/composition-api";
import { LoginUserResponseDto } from "~/apollo/generated-operations";
import { notificationStore, sessionStore } from "~/store";

export async function useLogin(
  app: NuxtAppOptions,
  redirect: (location: string) => void,
  data: LoginUserResponseDto,
) {
  await app.$apolloHelpers.onLogin(data.accessToken);
  sessionStore.updateExp(data.expiresIn);

  notificationStore.show({
    color: "info",
    message: app.i18n.t("devise.sessions.signed-in") as string,
    timeout: 3000,
  });

  if (app.router) {
    app.router.push("/");
  } else {
    redirect("/");
  }
}

export function useIsLoggedInGuard() {
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

export async function useLogout(
  app: NuxtAppOptions,
  redirect: (location: string) => void,
  message?: string,
) {
  await app.$apolloHelpers.onLogout();
  sessionStore.updateExp(0);

  notificationStore.show({
    color: "info",
    message: message || (app.i18n.t("devise.sessions.signed-out") as string),
    timeout: 3000,
  });

  if (app.router) {
    app.router.push("/devise/sessions/new");
  } else {
    redirect("/devise/sessions/new");
  }
}
