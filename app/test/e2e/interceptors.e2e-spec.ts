import { INestApplication, ValidationPipe } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import request from "supertest";

import { SettingsResolver } from "../../server/core/settings/settings.resolver";
import { MiddlewareInterceptor } from "../../server/common/interceptors/middleware.interceptor";
import { ConfigModule } from "../../server/core/config/config.module";
import { GraphQLModule } from "../../server/core/graphql/graphql.module";

describe("Interceptors (e2e)", () => {
  let app: INestApplication;
  let settingsResolver: SettingsResolver;
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, GraphQLModule],
      providers: [
        SettingsResolver,
        {
          provide: APP_INTERCEPTOR,
          useClass: MiddlewareInterceptor,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    settingsResolver = moduleRef.get<SettingsResolver>(SettingsResolver);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
    expect(settingsResolver).toBeDefined();
    expect(configService).toBeDefined();
  });

  it("sets the Access-Control-Allow-Origin header", () => {
    return request(app.getHttpServer())
      .post("/graphql")
      .send({
        operationName: null,
        query: `query { settings { version } }`,
      })
      .expect(({ header }) => {
        expect(header["access-control-allow-origin"]).toBe(
          configService.get<string>("accessControlAllowOrigin"),
        );
      })
      .expect(200);
  });
});
