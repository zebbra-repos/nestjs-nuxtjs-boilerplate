import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { factory, FactoryModule } from "typeorm-factories";

import { AuthModule } from "../../server/auth/auth.module";
import { ConfigModule } from "../../server/core/config/config.module";
import { GraphQLModule } from "../../server/core/graphql/graphql.module";
import { LoggerModule } from "../../server/core/logger/logger.module";
import { TypeOrmModule } from "../../server/core/type-orm/type-orm.module";
import { User } from "../../server/users/users.entity";
import { register, login } from "../utils/helpers";

describe("AuthResolver (e2e)", () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule,
        GraphQLModule,
        LoggerModule,
        TypeOrmModule,
        AuthModule,
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
          expect(body.data.login.expiresIn).toBe(60 * 60);
          expect(body.data.login.accessToken).toBeDefined();
        })
        .expect(200);
    });

    it("to fail if user does not exists", async () => {
      const user = await factory(User).make();
      return login(app, user)
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("Invalid email or password");
        })
        .expect(200);
    });

    it("to fail if password does not match", () => {
      return login(app, {
        email: user.email,
        password: user.password + "1234",
      } as User)
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("Invalid email or password");
        })
        .expect(200);
    });
  });
});
