import { GraphQLModule as GraphQL, GqlModuleOptions } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";

export const GraphQLModule = GraphQL.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    let autoSchemaFile;

    switch (process.env.NODE_ENV) {
      case "test":
        autoSchemaFile = true;
        break;
      case "development":
        autoSchemaFile = `${process.cwd()}/app/server/src/schema.gql`;
        break;
      case "production":
        autoSchemaFile = `${process.cwd()}/dist/app/server/src/schema.gql`;
        break;
      default:
        break;
    }

    const config: GqlModuleOptions = {
      autoSchemaFile,
      installSubscriptionHandlers: true,
      debug: true,
      playground: configService.get<boolean>("production") === false,
      context: ({ req }) => ({ req }),
      cors: {
        origin: configService.get<string>("accessControlAllowOrigin"),
        credentials: !configService.get<boolean>("production"),
      },
    };

    return config;
  },
});
