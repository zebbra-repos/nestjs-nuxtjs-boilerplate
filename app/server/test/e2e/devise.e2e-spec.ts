import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { factory, FactoryModule } from "typeorm-factories";

import { CoreModule } from "../../src/core";
import { DeviseModule } from "../../src/devise";
import { User } from "../../src/users";
import { signUp, signIn } from "../utils/helpers";

describe("DeviseResolver (e2e)", () => {
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

    queryRunner = (manager.queryRunner as any) = dbConnection.createQueryRunner(
      "master",
    );
  }, 1000 * 20);

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
            "Welcome! You have signed up successfully.",
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
          expect(body.errors[0].message).toBe("Invalid Email or password.");
        })
        .expect(200);
    });

    it("to fail if password does not match", () => {
      return signIn(app, {
        email: user.email,
        password: user.password + "1234",
      } as User)
        .expect(({ body }) => {
          expect(body.errors[0].message).toBe("Invalid Email or password.");
        })
        .expect(200);
    });
  });
});
