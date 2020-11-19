import { Provider } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";

export const PUB_SUB = Symbol("PUB_SUB");

export const PubSubProvider: Provider = {
  provide: PUB_SUB,
  useValue: new PubSub(),
};
