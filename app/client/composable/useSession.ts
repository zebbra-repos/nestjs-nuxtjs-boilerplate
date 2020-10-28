import { NuxtAppOptions } from "@nuxt/types";
import { SignInResponseDto } from "~/apollo/generated-operations";
import { notificationStore, sessionStore } from "~/store";

export async function useLogin(
  app: NuxtAppOptions,
  redirect: (location: string) => void,
  data: SignInResponseDto,
  message: string | null = null,
) {
  await app.$apolloHelpers.onLogin(data.accessToken);
  sessionStore.updateExp(data.expiresIn);

  notificationStore.show({
    color: "info",
    message: message || (app.i18n.t("devise.sessions.signed-in") as string),
    timeout: 3000,
  });

  if (app.router) {
    app.router.push(sessionStore.afterSignInPath);
  } else {
    redirect(sessionStore.afterSignInPath);
  }
}

export async function useLogout(
  app: NuxtAppOptions,
  redirect: (location: string) => void,
  message?: string,
  skipReset: boolean = false,
  afterSignInPath: string | null = null,
) {
  if (process.client) {
    if (!skipReset) {
      await app.$apolloHelpers.onLogout();
    }

    if (afterSignInPath) {
      sessionStore.updateAfterSignInPath(afterSignInPath);
    }

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
}
