import {
  SentryModule as Sentry,
  SentryModuleOptions,
} from "@ntegral/nestjs-sentry";
import { ConfigService } from "@nestjs/config";
import { Module, HttpException } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { SentryReportingInterceptor } from "../../common/interceptors";

@Module({
  imports: [
    Sentry.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<SentryModuleOptions>("sentry")!,
    }),
  ],
  providers: [
    {
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
    },
  ],
})
export class SentryModule {}
