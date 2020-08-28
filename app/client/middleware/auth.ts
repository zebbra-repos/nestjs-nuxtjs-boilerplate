import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { notificationStore } from "~/store";

export default defineNuxtMiddleware(({ app, redirect }) => {
  const token = app.$apolloHelpers.getToken();

  if (!token) {
    notificationStore.show({
      color: "error",
      message: "Please login",
      timeout: 3000,
    });
    redirect(401, "/login");
  }
});
