import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { factory, FactoryModule } from "typeorm-factories";

import { MockType, repositoryMockFactory } from "../../../test/factories";
import { ConfigModule, I18nModule } from "../../core";
import { UsersService, User } from "../../users";

import { RegistrationService } from "..";

describe("Registration Service", () => {
  let registrationService: RegistrationService;
  let repository: MockType<Repository<User>>;
  let user: User;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, I18nModule, FactoryModule],
      providers: [
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        UsersService,
        RegistrationService,
      ],
    }).compile();
    await moduleRef.init();

    registrationService = moduleRef.get<RegistrationService>(
      RegistrationService,
    );
    repository = moduleRef.get(getRepositoryToken(User));

    user = await factory(User).make();
  });

  it("is defined", () => {
    expect(registrationService).toBeDefined();
    expect(repository).toBeDefined();
  });

  it("translation context is devise.registration", () => {
    expect(registrationService.translationScope).toBe("devise.registrations");
  });

  it("a guest user should be able to sign up successfully", async () => {
    repository.findOne.mockReturnValueOnce(false);
    repository.create.mockReturnValueOnce(user);
    repository.save.mockReturnValueOnce(user);

    expect(await registrationService.signUp(user)).toEqual({
      afterActionPath: "/users/profile",
      message: "Welcome! You have signed up successfully.",
    });

    expect(repository.findOne).toBeCalledWith({
      where: { email: user.email },
    });
    expect(repository.create).toBeCalledWith(user);
    expect(repository.save).toBeCalledWith(user);
  });

  it("a guest should not sign up with email/password that already exists", async () => {
    repository.findOne.mockReturnValueOnce(user);
    await expect(registrationService.signUp(user)).rejects.toThrow(
      "This e-mail address is already taken.",
    );

    expect(repository.findOne).toBeCalledWith({
      where: { email: user.email },
    });
  });
});
