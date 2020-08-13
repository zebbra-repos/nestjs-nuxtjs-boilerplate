import { Provider, HttpException } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { SentryReportingInterceptor } from "../interceptors/sentry-reporting.interceptor";

export const SentryProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useValue: new SentryReportingInterceptor({
    filters: [
      {
        type: HttpException,
        filter: (excecption: HttpException) => {
          return excecption.getResponse() === "User already exists";
        },
      },
    ],
  }),
};
