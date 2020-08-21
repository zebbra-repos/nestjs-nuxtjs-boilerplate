export default () => ({
  port: process.env.PORT,
  production: false,
  logger: {
    level: process.env.LOG_LEVEL,
  },
});
