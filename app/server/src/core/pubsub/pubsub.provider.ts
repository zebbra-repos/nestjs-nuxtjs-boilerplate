import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisPubSub } from "graphql-redis-subscriptions";

export const PUB_SUB = Symbol("PUB_SUB");

export const PubSubProvider: Provider = {
  provide: PUB_SUB,
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    return new RedisPubSub({
      connection: {
        host: configService.get<String>("pubsub.host"),
        port: configService.get<Number>("pubsub.port"),
      },
    });
  },
};
