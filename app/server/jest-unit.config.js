module.exports = {
  testRegex: "(/__tests__/*|(\\.|/)spec)\\.(js|ts)$",
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["<rootDir>/**/*.ts"],
  coverageDirectory: "<rootDir>/../../coverage/unit",
  testEnvironment: "node",
};
