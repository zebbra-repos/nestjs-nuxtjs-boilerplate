export default () => ({
  accessControlAllowOrigin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
  csrfSecret: process.env.CSRF_SECRET,
  port: process.env.PORT,
  production: false,
  logger: {
    level: process.env.LOG_LEVEL,
  },
});
