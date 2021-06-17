import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { factory, FactoryModule } from "typeorm-factories";

import { CoreModule } from "../../src/core";
import { DeviseModule } from "../../src/devise";
import { User } from "../../src/users";
import { signUp } from "../utils/helpers";

describe("Validation Errors (e2e)", () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CoreModule, DeviseModule, FactoryModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const dbConnection = moduleRef.get(Connection);
    const manager = moduleRef.get(EntityManager);

    queryRunner = (manager.queryRunner as any) =
      dbConnection.createQueryRunner("master");

    await queryRunner.startTransaction();
  });

  afterAll(async () => {
    await queryRunner.rollbackTransaction();
    await app.close();
  });

  it("returns validation error details in path 'extensions.exception.response.message'", async () => {
    const user = await factory(User).make({ password: "short" });

    return signUp(app, user)
      .expect(({ body }) => {
        expect(body.data).toBeNull();
        expect(body.errors).toBeInstanceOf(Array);

        const error = body.errors[0];

        expect(error).toMatchObject({
          message: "Bad Request Exception",
          locations: [
            {
              line: 3,
              column: 9,
            },
          ],
          path: ["signUp"],
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            exception: {
              response: {
                statusCode: 400,
                message: [
                  "password must be longer than or equal to 8 characters",
                ],
                error: "Bad Request",
              },
              status: 400,
              message: "Bad Request Exception",
              stacktrace: expect.anything(),
            },
          },
        });
      })
      .expect(200);
  });
});
