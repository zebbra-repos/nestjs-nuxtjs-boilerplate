import {
  I18nModule as I18n,
  I18nJsonParser,
  QueryResolver,
  CookieResolver,
} from "nestjs-i18n";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

export const I18nModule = I18n.forRoot({
  fallbackLanguage: "en",
  parser: I18nJsonParser,
  parserOptions: {
    path: isProd
      ? `${process.cwd()}/dist/app/server/locales`
      : `${process.cwd()}/app/server/locales`,
    watch: isDev,
  },
  resolvers: [
    { use: QueryResolver, options: ["lang", "locale", "l"] },
    new CookieResolver(["i18n_redirected"]),
  ],
});
