import { defineNuxtPlugin, onGlobalSetup } from "@nuxtjs/composition-api";
import { sessionStore } from "~/store";

export default defineNuxtPlugin(() => {
  onGlobalSetup(() => {
    sessionStore.initialize();
  });
});
