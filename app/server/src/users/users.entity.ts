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
  public id!: number;

  @Field({ nullable: true, description: "User first name" })
  @Column({ name: "first_name", nullable: true })
  @IsOptional()
  @MinLength(3)
  @Transform(({ value }) => (value === "" ? null : value))
  public firstName?: string;

  @Field({ nullable: true, description: "User last name" })
  @Column({ name: "last_name", nullable: true })
  @IsOptional()
  @MinLength(3)
  @Transform(({ value }) => (value === "" ? null : value))
  public lastName?: string;

  @Field({ description: "User email" })
  @Column()
  @IsEmail()
  @Index({ unique: true })
  public email!: string;

  @Field({ description: "User password" })
  @Column()
  @IsString()
  @MinLength(8)
  @Exclude()
  public password!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  @Exclude()
  public createdAt!: Date;

  @Field({ description: "User updated date" })
  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  @Exclude()
  public updatedAt!: Date;

  @BeforeInsert()
  public async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  public async comparePassword(attempt: string) {
    return await compare(attempt, this.password);
  }
}
