import { GraphQLModule } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";

export const graphQLModule = GraphQLModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    let autoSchemaFile;

    switch (process.env.NODE_ENV) {
      case "test":
        autoSchemaFile = `${process.cwd()}/app/server/schema.gql`;
        break;
      case "development":
        autoSchemaFile = true;
        break;
      case "production":
        autoSchemaFile = `${process.cwd()}/dist/app/server/schema.gql`;
        break;
      default:
        break;
    }

    return {
      autoSchemaFile,
      installSubscriptionHandlers: true,
      debug: true,
      playground: configService.get<boolean>("production") === false,
      context: ({ req }) => ({ req }),
    };
  },
});
