module.exports = {
  bail: true,
  verbose: true,
  displayName: {
    name: "E2E",
    color: "blue",
  },
  testRegex: ".e2e-spec.ts$",
  rootDir: "../",
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["<rootDir>/../src/**/*.ts"],
  coverageDirectory: "<rootDir/../../../coverage/e2e",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
};
