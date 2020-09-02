import Vue from "vue";
import { onGlobalSetup, defineNuxtPlugin } from "@nuxtjs/composition-api";
import * as Sentry from "@sentry/browser";
import {
  Vue as VueIntegration,
  Dedupe,
  ExtraErrorData,
  ReportingObserver,
  RewriteFrames,
} from "@sentry/integrations";

import {
  useAppSettingsQuery,
  AppSettingsDto,
} from "~/apollo/generated-operations";
import { globalStore } from "~/store";

export default defineNuxtPlugin(({ error }) => {
  onGlobalSetup(() => {
    const { onResult } = useAppSettingsQuery();

    onResult((response) => {
      if (response.error) {
        error(response.error);
      } else if (!response.data) {
        throw new Error("Could no load settings");
      }

      const settings: AppSettingsDto = response.data.settings;
      globalStore.setVersion(settings.version);

      if (settings.sentryDsn !== "false") {
        configureSentry(settings);
      }
    });
  });
});

function configureSentry(settings: AppSettingsDto) {
  Sentry.init({
    dsn: settings.sentryDsn,
    environment: settings.sentryEnvironment,
    beforeSend: (event) => {
      // add custom logic to filter events or modify the event object
      return event;
    },
    integrations: [
      new Dedupe(),
      new ExtraErrorData(),
      new ReportingObserver(),
      new RewriteFrames(),
      new VueIntegration({
        Vue,
        attachProps: true,
        logErrors: process.env.NODE_ENV !== "production",
      }),
    ],
  });
}
