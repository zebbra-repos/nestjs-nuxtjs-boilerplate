import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nService } from "nestjs-i18n";
import { Repository, DeleteResult } from "typeorm";

import { CreateUserDto, UpdateUserDto } from "./users.dto";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly i18n: I18nService,
  ) {}

  public findAll() {
    return this.usersRepository.find();
  }

  public findByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  public findById(id: number) {
    return this.usersRepository.findOneOrFail(id);
  }

  public build(user: CreateUserDto) {
    return this.usersRepository.create(user);
  }

  public create(user: CreateUserDto) {
    return this.usersRepository.save(user);
  }

  public save(user: User) {
    return this.usersRepository.save(user);
  }

  public async update(
    id: number,
    newValue: UpdateUserDto,
    lang: string = "en",
  ) {
    const user = await this.usersRepository.findOneOrFail(id);
    if (!user.id) {
      const message = await this.i18n.t("user.errors.messages.does-not-exist", {
        lang,
      });
      throw new BadRequestException(message);
    }
    await this.usersRepository.update(id, newValue);
    return await this.usersRepository.findOne(id);
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  public async signUp(userDto: CreateUserDto, lang: string = "en") {
    const { email } = userDto;
    let user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      const message = await this.i18n.t("user.errors.messages.already-exists", {
        lang,
      });
      throw new BadRequestException(message);
    }
    user = await this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }
}
