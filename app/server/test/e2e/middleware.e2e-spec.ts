import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import request from "supertest";

import { CoreModule, SettingsResolver } from "../../src/core";

describe("Middlware (e2e)", () => {
  let app: INestApplication;
  let settingsResolver: SettingsResolver;
  let configService: ConfigService;

  const url =
    "/graphql?query=query%20appSettings%20%7B%0A%20%20settings%20%7B%0A%20%20%20%20version%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A&operationName=appSettings&variables=%7B%7D";

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CoreModule],
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

  describe("cors", () => {
    it("sets the Access-Control-Allow-Origin header", () => {
      return request(app.getHttpServer())
        .get(url)
        .expect(({ header }) => {
          expect(header["access-control-allow-origin"]).toBe(
            configService.get<string>("accessControlAllowOrigin"),
          );
        })
        .expect(200);
    });

    it("sets the Access-Control-Allow-Origin header for errors", () => {
      return request(app.getHttpServer())
        .get("/graphql")
        .expect(({ header }) => {
          expect(header["access-control-allow-origin"]).toBe(
            configService.get<string>("accessControlAllowOrigin"),
          );
        })
        .expect(400);
    });
  });

  describe("csurf", () => {
    it("sets the connect-sid session cookie", () => {
      return request(app.getHttpServer())
        .get(url)
        .expect(({ header }) => {
          expect(header["set-cookie"][0]).toMatch(/^connect.sid=.*/);
        })
        .expect(200);
    });

    it("sets the connect-sid session cookie for errors", () => {
      return request(app.getHttpServer())
        .get("/graphql")
        .expect(({ header }) => {
          expect(header["set-cookie"][0]).toMatch(/^connect.sid=.*/);
        })
        .expect(400);
    });
  });
});
