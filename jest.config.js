module.exports = {
  bail: true,
  verbose: true,
  projects: [
    "app/server/jest-unit.config.js",
    "app/server/test/jest-e2e.config.js",
    "app/client/jest-client.config.js",
  ],
};
