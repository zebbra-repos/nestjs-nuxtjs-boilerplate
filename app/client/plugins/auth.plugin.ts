import { defineNuxtPlugin, onGlobalSetup } from "@nuxtjs/composition-api";
import { useAuth } from "~/composable/useSession";

export default defineNuxtPlugin(({ app, redirect, route }) => {
  // plugin to enable auth middleware logic upon page reload.
  // in this case the auth middleware is only applied server side
  // and we have to apply the useAuth logic via plugin (client-only)
  //
  // to enable this plugin in your component, set the meta.auth flag to true
  onGlobalSetup(async () => {
    if (
      route.meta &&
      Array.isArray(route.meta) &&
      route.meta.find((meta) => meta.auth === true)
    ) {
      await useAuth(app, redirect, true, route.path);
    }
  });
});
