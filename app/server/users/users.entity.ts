import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { IsEmail, MinLength, IsString, IsOptional } from "class-validator";
import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { hash, compare } from "bcrypt";

import { UserDto } from "./users.dto";

@InputType("UserInput", { description: "User model" })
@ObjectType("UserType", { description: "User model" })
@Entity({ name: "users" })
export class User {
  @Field(() => Int, { description: "User database ID" })
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true, description: "User first name" })
  @Column({ name: "first_name", nullable: true })
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @Field({ nullable: true, description: "User last name" })
  @Column({ name: "last_name", nullable: true })
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @Field({ description: "User email" })
  @Column()
  @IsEmail()
  email!: string;

  @Field({ description: "User password" })
  @Column()
  @IsString()
  @MinLength(8)
  password!: string;

  @Field({ description: "User creation date" })
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Field({ description: "User updated date" })
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await compare(attempt, this.password);
  }

  toResponseObject(): UserDto {
    const { id, firstName, lastName, email } = this;
    const responseObject: UserDto = {
      id,
      firstName,
      lastName,
      email,
    };

    return responseObject;
  }
}
