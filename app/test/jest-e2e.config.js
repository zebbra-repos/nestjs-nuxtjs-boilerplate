module.exports = {
  testRegex: ".e2e-spec.ts$",
  rootDir: "../",
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["<rootDir>/server/**/*.ts"],
  coverageDirectory: "<rootDir/../../coverage/e2e",
  testEnvironment: "node",
};
