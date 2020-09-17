module.exports = {
  bail: true,
  verbose: true,
  displayName: "CLIENT",
  testRegex: "(/__tests__/*|(\\.|/)spec)\\.(js|ts)$",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
    "@nuxtjs/composition-api": "@nuxtjs/composition-api/lib/cjs/entrypoint.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverageFrom: ["<rootDir>/**/*.vue"],
  coverageDirectory: "<rootDir>/../../coverage/client",
};
