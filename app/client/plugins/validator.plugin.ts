import { defineNuxtPlugin } from "@nuxtjs/composition-api";

export default defineNuxtPlugin(({ app: { i18n } }, inject) => {
  inject("validator", {
    required: (property: string = "") => (v: string) =>
      !!v || i18n.t("validation.required", { property }),

    minLength: (
      length: number = 3,
      optional: boolean = false,
      property: string = "",
    ) => (v: string) =>
      (optional && v.length === 0) ||
      v.length >= length ||
      i18n.t("validation.min-length", { property, length }),

    maxLength: (length: number = 32, property: string = "") => (v: string) =>
      v.length <= length ||
      i18n.t("validation.max-length", { property, length }),

    emailFormat: (property: string = "") => (v: string) =>
      /.+@.+/.test(v) || i18n.t("validation.email", { property }),
  });
});
