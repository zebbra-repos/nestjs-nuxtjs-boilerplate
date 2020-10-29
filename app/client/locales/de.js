import { loadTranslations } from "~/utils/i18n";

const path =
  process.env.NODE_ENV === "production"
    ? "dist/app/client/dist/locales"
    : "app/client/locales";

export default () => loadTranslations("de", path);
