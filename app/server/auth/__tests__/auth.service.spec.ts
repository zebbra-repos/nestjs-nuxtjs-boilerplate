import { Repository } from "typeorm";
import { Test } from "@nestjs/testing";
import { FactoryModule, factory } from "typeorm-factories";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { hash } from "bcrypt";

import {
  MockType,
  repositoryMockFactory,
} from "../../../test/factories/repository-mock.factory";
import { ConfigModule } from "../../core/config/config.module";
import { User } from "../../users/users.entity";
import { UsersService } from "../../users/users.service";
import { AuthService } from "../auth.service";

describe("AuthService", () => {
  let authService: AuthService;
  let repository: MockType<Repository<User>>;
  let user: User;
  let password: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            configService.get<JwtModuleOptions>("auth")!,
        }),
        FactoryModule,
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        UsersService,
      ],
    }).compile();
    await moduleRef.init();

    authService = moduleRef.get<AuthService>(AuthService);
    repository = moduleRef.get(getRepositoryToken(User));
    user = await factory(User).make();
    password = user.password;
    user.password = await hash(user.password, 10);
  }, 1000 * 10);

  it("should be defined", () => {
    expect(authService).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("validateUser", () => {
    it("to return the validated user", async () => {
      repository.findOne.mockReturnValueOnce(user);
      expect(await authService.validateUser(user.email, password)).toEqual(
        user,
      );
      expect(repository.findOne).toBeCalledWith({ email: user.email });
    });

    it("to return null for invalid email", async () => {
      repository.findOne.mockReturnValueOnce(false);
      expect(await authService.validateUser(user.email, password)).toBe(null);
    });

    it("to return null for invalid password", async () => {
      const invalidPassword = password + "invalid";
      repository.findOne.mockReturnValueOnce(user);
      expect(await authService.validateUser(user.email, invalidPassword)).toBe(
        null,
      );
    });
  });

  describe("validateUserToken", () => {
    it("to return the validated user", async () => {
      const userWithId = Object.assign({}, user, { id: 1 });
      repository.findOneOrFail.mockReturnValueOnce(userWithId);
      expect(await authService.validateUserToken(userWithId)).toEqual(
        userWithId,
      );
      expect(repository.findOneOrFail).toBeCalledWith(userWithId.id);
    });
  });

  describe("register", () => {
    it("saves and returns a new user", async () => {
      const userWithId = Object.assign({}, user, { id: 1 });

      repository.findOne.mockReturnValueOnce(false);
      repository.create.mockReturnValueOnce(userWithId);
      repository.save.mockReturnValueOnce(userWithId);

      expect(await authService.register(user)).toEqual(userWithId);

      expect(repository.findOne).toBeCalledWith({
        where: { email: user.email },
      });
      expect(repository.create).toBeCalledWith(user);
      expect(repository.save).toBeCalledWith(userWithId);
    });

    it("fails if email is already taken", async () => {
      repository.findOne.mockReturnValueOnce(user);
      await expect(authService.register(user)).rejects.toThrow();

      expect(repository.findOne).toBeCalledWith({
        where: { email: user.email },
      });
    });
  });
});
