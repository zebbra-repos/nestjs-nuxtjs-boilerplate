import { Test } from "@nestjs/testing";
import Tokens from "csrf";

import { ConfigModule, GraphQLModule, MiddlewareResolver } from "../";

const tokens = new Tokens();

describe("MiddlewareResolver", () => {
  let middlewareResolver: MiddlewareResolver;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, GraphQLModule],
      providers: [MiddlewareResolver],
    }).compile();
    await moduleRef.init();

    middlewareResolver = moduleRef.get<MiddlewareResolver>(MiddlewareResolver);
  });

  it("should be defined", () => {
    expect(middlewareResolver).toBeDefined();
  });

  it("should return the csrf token", async () => {
    const token = tokens.create("secret");

    expect(await middlewareResolver.getCsrfToken(token)).toEqual({
      token,
    });
  });
});
