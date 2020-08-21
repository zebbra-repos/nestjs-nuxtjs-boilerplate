import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { factory, FactoryModule } from "typeorm-factories";
import request from "supertest";

import { configModule } from "../../server/core/config.module";
import { graphQLModule } from "../../server/core/graphql.module";
import { loggerModule } from "../../server/core/logger.module";
import { typeormModule } from "../../server/core/typeorm.module";
import { AuthModule } from "../../server/auth/auth.module";
import { UsersModule } from "../../server/users/users.module";
import { User } from "../../server/users/users.entity";
import { createToken } from "../utils/helpers";

describe("UserResolver (e2e)", () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let queryRunner: QueryRunner;
  let user: User;
  let token: String;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        configModule,
        graphQLModule,
        loggerModule,
        typeormModule,
        AuthModule,
        UsersModule,
        FactoryModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const dbConnection = moduleFixture.get(Connection);
    const manager = moduleFixture.get(EntityManager);

    queryRunner = (manager.queryRunner as any) = dbConnection.createQueryRunner(
      "master",
    );
    await queryRunner.startTransaction();
    user = await factory(User).make();
    token = await createToken(app, user);
  }, 1000 * 10);

  afterAll(async () => {
    await queryRunner.rollbackTransaction();
    await app.close();
  });

  describe("profile", () => {
    it("to restrict unauthorized access", () => {
      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
            query {
              profile {
                email
              }
            }
          `,
        })
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("Unauthorized");
        })
        .expect(200);
    });

    it("to allow authorized access", () => {
      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
            query {
              profile {
                email
              }
            }
          `,
        })
        .set("Authorization", `Bearer ${token}`)
        .expect(({ body }) => {
          expect(body.data.profile.email).toBe(user.email);
        })
        .expect(200);
    });
  });

  describe("getUser", () => {
    it("to restrict unauthorized access", () => {
      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
            query($id: Int!) {
              user(id: $id) {
                email
              }
            }
          `,
          variables: user,
        })
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("Unauthorized");
        })
        .expect(200);
    });

    it("to allow authorized access", () => {
      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
            query($id: Int!) {
              user(id: $id) {
                email
              }
            }
          `,
          variables: user,
        })
        .set("Authorization", `Bearer ${token}`)
        .expect(({ body }) => {
          expect(body.data.user.email).toBe(user.email);
        })
        .expect(200);
    });
  });
});
