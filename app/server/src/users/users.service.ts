import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";

import { User } from "./users.entity";
import { CreateUserDto, UpdateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async findById(id: number) {
    return await this.usersRepository.findOneOrFail(id);
  }

  async build(user: CreateUserDto) {
    return await this.usersRepository.create(user);
  }

  async create(user: CreateUserDto) {
    return await this.usersRepository.save(user);
  }

  async update(id: number, newValue: UpdateUserDto) {
    const user = await this.usersRepository.findOneOrFail(id);
    if (!user.id) {
      throw new BadRequestException("User does not exist");
    }
    await this.usersRepository.update(id, newValue);
    return await this.usersRepository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async signUp(userDto: CreateUserDto) {
    const { email } = userDto;
    let user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException("User already exists");
    }
    user = await this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }
}
