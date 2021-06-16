import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { factory, FactoryModule } from "typeorm-factories";
import request from "supertest";
import { decode } from "jsonwebtoken";

import { CoreModule } from "../../src/core";
import {
  AuthenticationModule,
  RegistrationModule,
  SessionModule,
  StrategyModule,
} from "../../src/devise";
import { User, UsersModule } from "../../src/users";
import { createToken } from "../utils/helpers";

describe("UserResolver (e2e)", () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let user: User;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CoreModule,
        StrategyModule,
        AuthenticationModule,
        RegistrationModule,
        SessionModule,
        UsersModule,
        FactoryModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const dbConnection = moduleRef.get(Connection);
    const manager = moduleRef.get(EntityManager);

    queryRunner = (manager.queryRunner as any) =
      dbConnection.createQueryRunner("master");
    await queryRunner.startTransaction();
    user = await factory(User).make();
    token = await createToken(app, user);
    user.id = (decode(token)! as any).id;
  });

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
