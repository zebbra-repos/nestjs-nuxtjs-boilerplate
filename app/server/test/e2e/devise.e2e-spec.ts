import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { factory, FactoryModule } from "typeorm-factories";

import { AuthModule } from "../../src/auth/auth.module";
import { ConfigModule } from "../../src/core/config/config.module";
import { GraphQLModule } from "../../src/core/graphql/graphql.module";
import { LoggerModule } from "../../src/core/logger/logger.module";
import { TypeOrmModule } from "../../src/core/type-orm/type-orm.module";
import { I18nModule } from "../../src/core/i18n/i18n.module";
import { DeviseModule } from "../../src/devise/devise.module";
import { User } from "../../src/users/users.entity";
import { signUp, signIn } from "../utils/helpers";

describe("DeviseResolver (e2e)", () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;

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

  describe("signUp", () => {
    let user: User;

    beforeAll(async () => {
      await queryRunner.startTransaction();
      user = await factory(User).make();
    });

    afterAll(async () => {
      await queryRunner.rollbackTransaction();
    });

    it("to create a new user", () => {
      return signUp(app, user)
        .expect(({ body }) => {
          expect(body.data.signUp.message).toBe(
            "You will receive an email with instructions for how to confirm your email address in a few minutes.",
          );
        })
        .expect(200);
    });

    it("to fail if email is taken", () => {
      return signUp(app, user)
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("User already exists");
        })
        .expect(200);
    });
  });

  describe("signIn", () => {
    let user: User;

    beforeAll(async () => {
      await queryRunner.startTransaction();
      user = await factory(User).make();
      await signUp(app, user);
    });

    afterAll(async () => {
      await queryRunner.rollbackTransaction();
    });

    it("to be successful", () => {
      return signIn(app, user)
        .expect(({ body }) => {
          expect(body.data.signIn.expiresIn).toBe(60 * 60);
          expect(body.data.signIn.accessToken).toBeDefined();
        })
        .expect(200);
    });

    it("to fail if user does not exists", async () => {
      const user = await factory(User).make();
      return signIn(app, user)
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("Invalid email or password");
        })
        .expect(200);
    });

    it("to fail if password does not match", () => {
      return signIn(app, {
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
