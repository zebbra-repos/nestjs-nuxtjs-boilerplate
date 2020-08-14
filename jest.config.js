module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "app/server",
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  coverageDirectory: "../../coverage/backend",
  testEnvironment: "node",
};
