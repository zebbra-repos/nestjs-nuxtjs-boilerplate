module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/../../app/client/$1",
    "^~/(.*)$": "<rootDir>/../../app/client/$1",
    "^vue$": "vue/dist/vue.common.js",
    "nuxt-composition-api": "nuxt-composition-api/lib/cjs/entrypoint.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/../../app/client/components/**/*.vue",
    "<rootDir>/../../app/client/pages/**/*.vue",
  ],
  coverageDirectory: "<rootDir>/../../coverage/client",
};
