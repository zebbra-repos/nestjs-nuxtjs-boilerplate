import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Devise {
  @PrimaryGeneratedColumn()
  public id!: number;

  // Confirmation Section
  @Index({ unique: true })
  @Column({ name: "confirmation_token", nullable: true })
  public confirmationToken?: string;

  @Column({
    name: "confirmed_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  public confirmedAt?: Date;

  @Column({
    name: "confirmation_sent_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  public confirmationSentAt?: Date;

  @Column({ name: "unconfirmed_email", nullable: true })
  public unconfirmedEmail?: string;

  // Unlock Section
  @Column({
    name: "failed_attempts",
  })
  public failedAttempts: number = 0;

  @Column({
    name: "locked_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  public lockedAt?: Date;

  @Index({ unique: true })
  @Column({ name: "unlock_token", nullable: true })
  public unlockToken?: string;

  // Internal Fields
  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  @Exclude()
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  @Exclude()
  public updatedAt!: Date;
}
