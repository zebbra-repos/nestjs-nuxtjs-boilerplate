import { registerAs } from "@nestjs/config";

export default registerAs("sentry", () => ({
  dsn:
    process.env.SENTRY_DISABLED === "true"
      ? false
      : process.env.SENTRY_DSN || false,
  debug: process.env.SENTRY_DEBUG === "true",
  environment: process.env.SENTRY_ENVIRONMENT || "development",
}));
