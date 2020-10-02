import { Repository } from "typeorm";
import { Test } from "@nestjs/testing";
import { FactoryModule, factory } from "typeorm-factories";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { hash } from "bcrypt";

import { MockType, repositoryMockFactory } from "../../../../test/factories";
import { ConfigModule } from "../../../core";
import { User, UsersService } from "../../../users";
import { RegistrationService } from "..";

describe("RegistrationService", () => {
  let sessionService: RegistrationService;
  let repository: MockType<Repository<User>>;
  let user: User;

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
        RegistrationService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        UsersService,
      ],
    }).compile();
    await moduleRef.init();

    sessionService = moduleRef.get<RegistrationService>(RegistrationService);
    repository = moduleRef.get(getRepositoryToken(User));
    user = await factory(User).make();
    user.password = await hash(user.password, 10);
  }, 1000 * 20);

  it("should be defined", () => {
    expect(sessionService).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("signUp", () => {
    it("saves and returns a new user", async () => {
      const userWithId = Object.assign({}, user, { id: 1 });

      repository.findOne.mockReturnValueOnce(false);
      repository.create.mockReturnValueOnce(userWithId);
      repository.save.mockReturnValueOnce(userWithId);

      expect(await sessionService.signUp(user)).toEqual(userWithId);

      expect(repository.findOne).toBeCalledWith({
        where: { email: user.email },
      });
      expect(repository.create).toBeCalledWith(user);
      expect(repository.save).toBeCalledWith(userWithId);
    });

    it("fails if email is already taken", async () => {
      repository.findOne.mockReturnValueOnce(user);
      await expect(sessionService.signUp(user)).rejects.toThrow();

      expect(repository.findOne).toBeCalledWith({
        where: { email: user.email },
      });
    });
  });
});
