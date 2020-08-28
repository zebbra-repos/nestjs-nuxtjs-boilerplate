import { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
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

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["~/plugins/apollo/provider"],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://typescript.nuxtjs.org/guide/setup.html#installation
    "@nuxt/typescript-build",
    // Doc: https://github.com/nuxt-community/stylelint-module
    "@nuxtjs/stylelint-module",
    // Doc: https://github.com/nuxt-community/vuetify-module
    "@nuxtjs/vuetify",
    // Doc: https://composition-api.now.sh/
    "@nuxtjs/composition-api",
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://pwa.nuxtjs.org/
    ["@nuxtjs/pwa", { meta: false, icon: false, manifest: false }],
    // Doc: https://github.com/nuxt-community/sentry-module
    "@nuxtjs/sentry",
    // Doc: https://github.com/nuxt-community/apollo-module
    "@nuxtjs/apollo",
  ],

  /*
   ** apollo module configuration
   ** See https://github.com/nuxt-community/apollo-module
   */
  apollo: {
    clientConfigs: {
      default: "~/apollo/config/default",
    },
  },

  /*
   ** sentry module configuration
   ** See https://github.com/nuxt-community/sentry-module
   */
  sentry: {
    lazy: true,
    disabled: process.env.SENTRY_DISABLED || false,
  },

  /*
   ** vuetify module configuration
   ** See https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    optionsPath: "~/vuetify.options.ts",
  },

  /*
   ** Nuxt.js api configuration
   ** See https://nuxtjs.org/api
   */
  srcDir: "app/client",
  generate: {
    dir: "dist/app/client",
  },
  server: {
    port: process.env.PORT || 5000,
  },
  telemetry: false,
  publicRuntimeConfig: {
    httpGraphQLEndpoint:
      process.env.HTTP_GRAPHQL_ENDPOINT || "http://localhost:3000/graphql",
    wsGraphQLEndpoint:
      process.env.WS_GRAPHQL_ENDPOINT || "ws://localhost:3000/graphql",
  },
};

export default config;
