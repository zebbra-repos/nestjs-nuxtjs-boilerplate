import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { factory, FactoryModule } from "typeorm-factories";

import { AuthModule } from "../../server/auth/auth.module";
import { configModule } from "../../server/core/config.module";
import { graphQLModule } from "../../server/core/graphql.module";
import { loggerModule } from "../../server/core/logger.module";
import { typeormModule } from "../../server/core/typeorm.module";
import { User } from "../../server/users/users.entity";
import { register, login } from "../utils/helpers";

describe("AuthResolver (e2e)", () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let queryRunner: QueryRunner;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        configModule,
        graphQLModule,
        loggerModule,
        typeormModule,
        AuthModule,
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
  }, 1000 * 10);

  afterAll(async () => {
    await app.close();
  });

  describe("register", () => {
    let user: User;

    beforeAll(async () => {
      await queryRunner.startTransaction();
      user = await factory(User).make();
    });

    afterAll(async () => {
      await queryRunner.rollbackTransaction();
    });

    it("to create a new user", () => {
      return register(app, user)
        .expect(({ body }) => {
          expect(body.data.register.email).toBe(user.email);
        })
        .expect(200);
    });

    it("to fail if email is taken", () => {
      return register(app, user)
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("User already exists");
        })
        .expect(200);
    });
  });

  describe("login", () => {
    let user: User;

    beforeAll(async () => {
      await queryRunner.startTransaction();
      user = await factory(User).make();
      await register(app, user);
    });

    afterAll(async () => {
      await queryRunner.rollbackTransaction();
    });

    it("to be successful", () => {
      return login(app, user)
        .expect(({ body }) => {
          expect(body.data.login.expiresIn).toBe(3600);
          expect(body.data.login.accessToken).toBeDefined();
        })
        .expect(200);
    });

    it("to fail if user does not exists", async () => {
      const user = await factory(User).make();
      return login(app, user)
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("Unauthorized");
        })
        .expect(200);
    });

    it("to fail if password does not match", () => {
      return login(app, {
        email: user.email,
        password: user.password + "1234",
      } as User)
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("Unauthorized");
        })
        .expect(200);
    });
  });
});
