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
    const { onError, onResult } = useAppSettingsQuery();

    onResult((res) => {
      const settings = res?.data?.settings!;

      if (settings) {
        globalStore.setVersion(settings.version);
        if (settings.sentryDsn !== "false") {
          configureSentry(settings);
        }
      }
    });

    onError((err) => {
      if (err) {
        error(err);
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
