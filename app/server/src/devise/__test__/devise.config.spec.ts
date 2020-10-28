import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

import { ConfigModule } from "../../core";

describe("Devise Configuration", () => {
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();
    await moduleRef.init();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  describe("Registration Module", () => {
    it("afterSignUpPath is defined", () => {
      expect(
        typeof configService.get("devise.registration.afterSignUpPath"),
      ).toBe("string");
    });

    it("afterInactiveSignUpPath is defined", () => {
      expect(
        typeof configService.get("devise.registration.afterInactiveSignUpPath"),
      ).toBe("string");
    });
  });
});
