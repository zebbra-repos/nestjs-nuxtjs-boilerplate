export default () => ({
  port: 3001,
  logger: {
    level: "error",
  },
  database: {
    autoLoadEntities: true,
    type: "postgres",
    url:
      process.env.TYPEORM_URL ||
      "postgres://postgres@localhost:5432/nest-nuxt-boilerplate-test",
    entities: [process.env.TYPEORM_ENTITIES!],
    logging: false,
    synchronize: false,
  },
});
