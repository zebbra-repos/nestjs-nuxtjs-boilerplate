export default () => ({
  accessControlAllowOrigin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
  port: process.env.PORT,
  production: false,
  logger: {
    level: process.env.LOG_LEVEL,
  },
});
