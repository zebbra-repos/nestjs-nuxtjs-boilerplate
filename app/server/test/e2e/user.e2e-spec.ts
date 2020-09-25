import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { factory, FactoryModule } from "typeorm-factories";
import request from "supertest";
import { decode } from "jsonwebtoken";

import { ConfigModule } from "../../src/core/config/config.module";
import { GraphQLModule } from "../../src/core/graphql/graphql.module";
import { LoggerModule } from "../../src/core/logger/logger.module";
import { TypeOrmModule } from "../../src/core/type-orm/type-orm.module";
import { AuthModule } from "../../src/auth/auth.module";
import { UsersModule } from "../../src/users/users.module";
import { I18nModule } from "../../src/core/i18n/i18n.module";
import { DeviseModule } from "../../src/devise/devise.module";
import { User } from "../../src/users/users.entity";
import { createToken } from "../utils/helpers";

describe("UserResolver (e2e)", () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let user: User;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule,
        I18nModule,
        GraphQLModule,
        LoggerModule,
        TypeOrmModule,
        AuthModule,
        DeviseModule,
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
    user.id = (decode(token)! as any).id;
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
