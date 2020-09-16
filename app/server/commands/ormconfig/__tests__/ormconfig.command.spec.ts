import { promises as fs, existsSync } from "fs";
import { Test } from "@nestjs/testing";
import { CommandModule, CommandModuleTest } from "nestjs-command";

import { OrmconfigModule } from "../ormconfig.module";

describe("Ormconfig Command", () => {
  let commandModule: CommandModuleTest;

  beforeAll(async () => {
    if (existsSync("ormconfig.json")) {
      await fs.unlink("ormconfig.json");
    }

    const moduleRef = await Test.createTestingModule({
      imports: [OrmconfigModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();

    commandModule = new CommandModuleTest(app.select(CommandModule));
  });

  afterAll(async () => await fs.unlink("ormconfig.json"));

  it("ormconfig.json does not exist", () => {
    return expect(existsSync("ormconfig.json")).toBeFalsy();
  });

  it("creates ormconfig.json", async () => {
    const command = "create:ormconfig";
    const exitCode = 0;

    const expected = {
      type: "postgres",
      logging: false,
      synchronize: false,
      entities: ["dist/app/server/**/*.entity.js"],
      autoLoadEntities: true,
      url: expect.anything(),
      migrations: ["db/migrate/*.ts"],
      cli: {
        migrationsDir: "db/migrate",
      },
    };

    await commandModule.execute(command, {}, exitCode);
    const ormconfig = await fs.readFile("ormconfig.json");

    return expect(JSON.parse(ormconfig.toString())).toEqual(expected);
  });
});
