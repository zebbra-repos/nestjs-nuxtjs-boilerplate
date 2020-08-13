import { GraphQLModule } from "@nestjs/graphql";

export const graphQLModule = GraphQLModule.forRoot({
  autoSchemaFile: `${process.cwd()}/app/server/schema.gql`,
  installSubscriptionHandlers: true,
  debug: true,
  playground: true,
  context: ({ req }) => ({ req }),
});
