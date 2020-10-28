import { Repository } from "typeorm";
import { Test } from "@nestjs/testing";
import { FactoryModule, factory } from "typeorm-factories";
import { getRepositoryToken } from "@nestjs/typeorm";
import { hash } from "bcrypt";

import { MockType, repositoryMockFactory } from "../../../test/factories";
import { ConfigModule, I18nModule } from "../../core";
import { User, UsersService } from "../../users";

import { AuthenticationService } from "..";

describe("Authentication Service", () => {
  let authService: AuthenticationService;
  let repository: MockType<Repository<User>>;
  let user: User;
  let password: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, I18nModule, FactoryModule],
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
  });

  it("is defined", () => {
    expect(authService).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("validateUser", () => {
    it("to return the validated user", async () => {
      repository.findOne.mockReturnValueOnce(user);
      expect(
        await authService.validateUser(user.email, password, "en"),
      ).toEqual(user);
      expect(repository.findOne).toBeCalledWith({ email: user.email });
    });

    it("to throw an error for invalid email", () => {
      repository.findOne.mockReturnValueOnce(false);
      expect(
        authService.validateUser(user.email, password, "en"),
      ).rejects.toThrow("Invalid Email or password.");
    });

    it("to throw an error for invalid password", () => {
      const invalidPassword = password + "invalid";
      repository.findOne.mockReturnValueOnce(user);
      expect(
        authService.validateUser(user.email, invalidPassword, "en"),
      ).rejects.toThrow("Invalid Email or password.");
    });
  });

  describe("validateToken", () => {
    it("to return the validated user", async () => {
      const userWithId = Object.assign({}, user, { id: 1 });
      repository.findOneOrFail.mockReturnValueOnce(userWithId);

      expect(await authService.validateToken(userWithId, "en")).toEqual(
        userWithId,
      );
      expect(repository.findOneOrFail).toBeCalledWith(userWithId.id);
    });
  });
});
