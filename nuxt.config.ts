import { Configuration } from "@nuxt/types";

const config: Configuration = {
  mode: "universal",

  /*
   ** Headers of the page
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
   */
  plugins: [],

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
    "nuxt-composition-api",
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://www.npmjs.com/package/nuxt-lazy-load/v/latest
    "nuxt-lazy-load",
    // Doc: https://pwa.nuxtjs.org/
    ["@nuxtjs/pwa", { meta: false, icon: false, manifest: false }],
  ],

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
  srcDir: "client",
  buildDir: "dist/client",
  server: {
    port: process.env.PORT || 5000,
  },
};

export default config;
