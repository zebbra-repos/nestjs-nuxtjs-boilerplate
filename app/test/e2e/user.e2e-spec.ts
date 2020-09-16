import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { factory, FactoryModule } from "typeorm-factories";
import request from "supertest";

import { ConfigModule } from "../../server/core/config/config.module";
import { GraphQLModule } from "../../server/core/graphql/graphql.module";
import { LoggerModule } from "../../server/core/logger/logger.module";
import { TypeOrmModule } from "../../server/core/type-orm/type-orm.module";
import { AuthModule } from "../../server/auth/auth.module";
import { UsersModule } from "../../server/users/users.module";
import { User } from "../../server/users/users.entity";
import { createToken } from "../utils/helpers";

describe("UserResolver (e2e)", () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let user: User;
  let token: String;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule,
        GraphQLModule,
        LoggerModule,
        TypeOrmModule,
        AuthModule,
        UsersModule,
        FactoryModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const dbConnection = moduleRef.get(Connection);
    const manager = moduleRef.get(EntityManager);

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
