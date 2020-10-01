import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";

import { CreateUserDto, UpdateUserDto } from "./users.dto";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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

  public async update(id: number, newValue: UpdateUserDto) {
    const user = await this.usersRepository.findOneOrFail(id);
    if (!user.id) {
      throw new BadRequestException("User does not exist");
    }
    await this.usersRepository.update(id, newValue);
    return await this.usersRepository.findOne(id);
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  public async signUp(userDto: CreateUserDto) {
    const { email } = userDto;
    let user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException("User already exists");
    }
    user = await this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }
}
