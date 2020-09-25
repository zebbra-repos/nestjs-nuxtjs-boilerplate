module.exports = {
  bail: true,
  verbose: true,
  displayName: {
    name: "UNIT",
    color: "red",
  },
  testRegex: "(/__tests__/*|(\\.|/)spec)\\.(js|ts)$",
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "<rootDir>/../../coverage/unit",
  testEnvironment: "node",
};
