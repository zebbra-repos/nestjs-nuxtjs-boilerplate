import { GraphQLModule as GraphQL } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    GraphQL.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        let autoSchemaFile;

        switch (process.env.NODE_ENV) {
          case "test":
            autoSchemaFile = true;
            break;
          case "development":
            autoSchemaFile = `${process.cwd()}/app/server/schema.gql`;
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
    }),
  ],
})
export class GraphQLModule {}
