import {
  provide,
  onGlobalSetup,
  defineNuxtPlugin,
} from "@nuxtjs/composition-api";
import { DefaultApolloClient } from "@vue/apollo-composable";

/**
 * This plugin will connect @nuxt/apollojs with @vue/apollo-composable
 */
export default defineNuxtPlugin(({ app }) => {
  onGlobalSetup(() => {
    provide(DefaultApolloClient, app.apolloProvider?.defaultClient);
  });
});
