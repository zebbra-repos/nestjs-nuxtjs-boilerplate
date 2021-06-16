import { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
  // Target: https://go.nuxtjs.dev/config-target
  // target: "server",
  // ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Customize the progress-bar color
  loading: { color: "#fff" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/apollo.plugin",
      mode: "all",
    },
    {
      src: "~/plugins/persistence.plugin",
      mode: "client",
    },
    {
      src: "~/plugins/settings.plugin",
      mode: "client",
    },
    {
      src: "~/plugins/sentry.plugin",
      mode: "all",
    },
    {
      src: "~/plugins/validator.plugin",
      mode: "all",
    },
    {
      src: "~/plugins/auth.plugin",
      mode: "client",
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://typescript.nuxtjs.org/guide/setup.html#installation
    "@nuxt/typescript-build",
    // https://github.com/nuxt-community/stylelint-module
    "@nuxtjs/stylelint-module",
    // https://github.com/nuxt-community/vuetify-module
    "@nuxtjs/vuetify",
    // https://composition-api.nuxtjs.org/
    "@nuxtjs/composition-api/module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://pwa.nuxtjs.org/
    ["@nuxtjs/pwa", { meta: false, icon: false, manifest: false }],
    // https://github.com/nuxt-community/apollo-module
    "@nuxtjs/apollo",
    // https://i18n.nuxtjs.org/
    "nuxt-i18n",
  ],

  // https://github.com/nuxt-community/apollo-module
  apollo: {
    clientConfigs: {
      default: "~/apollo/config/default",
    },
  },

  // https://github.com/nuxt-community/vuetify-module
  vuetify: {
    customVariables: ["~/assets/stylesheets/variables.scss"],
    treeShake: true,
    optionsPath: "~/vuetify.options.ts",
  },

  // https://i18n.nuxtjs.org/
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
      },
      {
        code: "de",
        file: "de.js",
      },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    lazy: true,
    langDir: "locales/",
    detectBrowserLanguage: {
      fallbackLocale: "en",
      onlyOnRoot: true,
    },
    vueI18n: {
      fallbackLocale: "en",
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // https://nuxtjs.org/api
  srcDir: "app/client",
  buildDir: "dist/app/client",
  dir: {
    // Static serve dir is resolved to path.resolve(srcDir, dir.static)
    // See https://github.com/nuxt/nuxt.js/blob/dev/packages/server/src/server.js
    static:
      process.env.NODE_ENV === "production"
        ? "../../dist/app/client/dist/static"
        : "static",
  },
  server: {
    port: process.env.PORT || 5000,
  },

  // Runtime config: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config
  publicRuntimeConfig: {
    apollo: {
      httpGraphQLEndpoint:
        process.env.HTTP_GRAPHQL_ENDPOINT || "http://localhost:3000/graphql",
      wsGraphQLEndpoint:
        process.env.WS_GRAPHQL_ENDPOINT || "ws://localhost:3000/graphql",
    },
    sentry: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT,
      logErrors: process.env.NODE_ENV !== "production",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.node = {
        fs: "empty",
      };
    },
  },

  // Do not send anonymous telemetry data: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-telemetry
  telemetry: false,
};

export default config;
