import { Repository } from "typeorm";
import { Test } from "@nestjs/testing";
import { FactoryModule, factory } from "typeorm-factories";
import { getRepositoryToken } from "@nestjs/typeorm";
import { hash } from "bcrypt";

import { MockType, repositoryMockFactory } from "../../../../test/factories";
import { ConfigModule, I18nModule } from "../../../core";
import { User, UsersService } from "../../../users";

import { AuthenticationService } from "..";
import { Devise } from "../../devise.entity";
import { ConfirmationService, UnlockService } from "../../";

describe("AuthenticationService", () => {
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
        {
          provide: getRepositoryToken(Devise),
          useFactory: repositoryMockFactory,
        },
        UsersService,
        ConfirmationService,
        UnlockService,
      ],
    }).compile();
    await moduleRef.init();

    authService = moduleRef.get<AuthenticationService>(AuthenticationService);
    repository = moduleRef.get(getRepositoryToken(User));
    user = await factory(User).make();
    password = user.password;
    user.password = await hash(user.password, 10);
  }, 1000 * 20);

  it("should be defined", () => {
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

    it("to return null for invalid email", () => {
      repository.findOne.mockReturnValueOnce(false);
      expect(
        authService.validateUser(user.email, password, "en"),
      ).rejects.toThrow("Invalid Email or password.");
    });

    it("to return null for invalid password", () => {
      const invalidPassword = password + "invalid";
      repository.findOne.mockReturnValueOnce(user);
      expect(
        authService.validateUser(user.email, invalidPassword, "en"),
      ).rejects.toThrow("Invalid Email or password.");
    });
  });

  describe("validateUserToken", () => {
    it("to return the validated user", async () => {
      const userWithId = Object.assign({}, user, { id: 1 });
      repository.findOneOrFail.mockReturnValueOnce(userWithId);
      expect(await authService.validateUserToken(userWithId, "en")).toEqual(
        userWithId,
      );
      expect(repository.findOneOrFail).toBeCalledWith(userWithId.id);
    });
  });
});
