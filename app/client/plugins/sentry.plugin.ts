import Vue from "vue";
import { defineNuxtPlugin, onGlobalSetup } from "@nuxtjs/composition-api";
import * as Sentry from "@sentry/browser";
import {
  Vue as VueIntegration,
  Dedupe,
  ExtraErrorData,
  ReportingObserver,
  RewriteFrames,
} from "@sentry/integrations";

export default defineNuxtPlugin(({ $config }) => {
  onGlobalSetup(() => {
    Sentry.init({
      dsn: $config.sentry.dsn,
      environment: $config.sentry.environment,
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
          logErrors: $config.sentry.logErrors,
        }),
      ],
    });
  });
});
