import { Repository } from "typeorm";
import { Test } from "@nestjs/testing";
import { FactoryModule, factory } from "typeorm-factories";
import { getRepositoryToken } from "@nestjs/typeorm";
import { hash } from "bcrypt";

import { MockType, repositoryMockFactory } from "../../../../test/factories";
import { ConfigModule } from "../../../core";
import { User, UsersService } from "../../../users";

import { AuthenticationService } from "..";

describe("AuthenticationService", () => {
  let authService: AuthenticationService;
  let repository: MockType<Repository<User>>;
  let user: User;
  let password: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, FactoryModule],
      providers: [
        AuthenticationService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        UsersService,
      ],
    }).compile();
    await moduleRef.init();

    authService = moduleRef.get<AuthenticationService>(AuthenticationService);
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
});