module.exports = {
  bail: true,
  verbose: true,
  projects: [
    "app/server/jest-unit.config.js",
    "app/test/jest-e2e.config.js",
    "app/client/jest-client.config.js",
  ],
};
