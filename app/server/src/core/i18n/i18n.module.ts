import { ConfigService } from "@nestjs/config";
import {
  I18nModule as I18n,
  I18nJsonParser,
  I18nOptionsWithoutResolvers,
  QueryResolver,
  CookieResolver,
} from "nestjs-i18n";

export const I18nModule = I18n.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const isProd = process.env.NODE_ENV === "production";
    const isDev = process.env.NODE_ENV === "development";

    const config: I18nOptionsWithoutResolvers = {
      fallbackLanguage: configService.get<string>("fallbackLanguage")!,
      parserOptions: {
        path: isProd
          ? `${process.cwd()}/dist/app/server/locales`
          : `${process.cwd()}/app/server/locales`,
        watch: isDev,
      },
    };

    return config;
  },
  parser: I18nJsonParser,
  resolvers: [
    { use: QueryResolver, options: ["lang", "locale", "l"] },
    new CookieResolver(["i18n_redirected"]),
  ],
});
