import { onGlobalSetup, defineNuxtPlugin } from "@nuxtjs/composition-api";

import { useAppSettingsQuery } from "~/apollo/generated-operations";
import { globalStore } from "~/store";

export default defineNuxtPlugin(({ error }) => {
  onGlobalSetup(() => {
    const { onError, onResult } = useAppSettingsQuery();

    onResult((res) => {
      const settings = res?.data?.settings!;

      if (settings) {
        globalStore.setVersion(settings.version);
        globalStore.setDevise(settings.devise);
      }
    });

    onError((err) => {
      if (err) {
        error(err);
      }
    });
  });
});
