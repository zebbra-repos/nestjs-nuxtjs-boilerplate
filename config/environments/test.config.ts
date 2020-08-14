export default () => ({
  port: 3001,
  logger: {
    level: "error",
  },
  database: {
    type: "postgres",
    url: "postgres://postgres@localhost:5432/nest-nuxt-boilerplate-test",
    entities: [process.env.TYPEORM_ENTITIES!],
    logging: false,
    synchronize: false,
    autoLoadEntities: true,
  },
});
