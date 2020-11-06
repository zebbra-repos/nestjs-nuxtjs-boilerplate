import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { useAuth } from "~/composable/useSession";

export default defineNuxtMiddleware(async ({ app, redirect, route }) => {
  await useAuth(app, redirect, false, route.path);
});
