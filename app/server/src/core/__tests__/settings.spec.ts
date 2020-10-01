import { Test } from "@nestjs/testing";

import { ConfigModule, GraphQLModule, SettingsResolver } from "../";

describe("SettingsResolver", () => {
  let settingsResolver: SettingsResolver;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, GraphQLModule],
      providers: [SettingsResolver],
    }).compile();
    await moduleRef.init();

    settingsResolver = moduleRef.get<SettingsResolver>(SettingsResolver);
  });

  it("should be defined", () => {
    expect(settingsResolver).toBeDefined();
  });

  it("should return the application version", async () => {
    expect(await settingsResolver.getSettings()).toEqual({
      version: expect.anything(),
    });
  });
});
