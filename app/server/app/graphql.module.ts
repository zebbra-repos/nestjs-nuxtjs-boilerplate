import { GraphQLModule } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";

export const graphQLModule = GraphQLModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      autoSchemaFile: `${process.cwd()}/app/server/schema.gql`,
      installSubscriptionHandlers: true,
      debug: true,
      playground: configService.get<boolean>("production") === false,
      context: ({ req }) => ({ req }),
    };
  },
});
