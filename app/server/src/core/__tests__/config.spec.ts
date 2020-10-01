import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

import { ConfigModule } from "../config/config.module";

describe("ConfigModule", () => {
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();
    await moduleRef.init();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it("should be defined", () => {
    expect(configService).toBeDefined();
  });

  it("should load sendgrid config", () => {
    expect(configService.get("sendgrid")).toBeDefined();
  });

  it("should load sentry config", () => {
    expect(configService.get("sentry")).toBeDefined();
  });

  it("should load type-orm config", () => {
    expect(configService.get("type-orm")).toBeDefined();
  });
});
