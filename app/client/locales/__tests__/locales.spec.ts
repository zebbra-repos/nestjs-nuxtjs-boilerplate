import { join } from "path";
import { loadTranslations } from "~/utils/i18n";

const i18nPath = join(__dirname, "../");

describe("Locales", () => {
  it("loads translations for de", async () => {
    const translations = await loadTranslations(
      "de",
      i18nPath,
      new RegExp(".*.json"),
    );

    expect(Object.keys(translations)).toContain("devise.sessions.signed-in");
  });

  it("loads translations for en", async () => {
    const translations = await loadTranslations(
      "en",
      i18nPath,
      new RegExp(".*.json"),
    );

    expect(Object.keys(translations)).toContain("devise.sessions.signed-in");
  });
});
