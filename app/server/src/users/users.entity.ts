import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Index,
} from "typeorm";
import { IsEmail, MinLength, IsString, IsOptional } from "class-validator";
import { Transform, Exclude } from "class-transformer";
import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { hash, compare } from "bcrypt";

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
  @Transform((v) => (v === "" ? null : v))
  firstName?: string;

  @Field({ nullable: true, description: "User last name" })
  @Column({ name: "last_name", nullable: true })
  @IsOptional()
  @MinLength(3)
  @Transform((v) => (v === "" ? null : v))
  lastName?: string;

  @Field({ description: "User email" })
  @Column()
  @IsEmail()
  @Index({ unique: true })
  email!: string;

  @Field({ description: "User password" })
  @Column()
  @IsString()
  @MinLength(8)
  @Exclude()
  password!: string;

  @Field({ description: "User creation date" })
  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  @Exclude()
  createdAt!: Date;

  @Field({ description: "User updated date" })
  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  @Exclude()
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await compare(attempt, this.password);
  }
}
