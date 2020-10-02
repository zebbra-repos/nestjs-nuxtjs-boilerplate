import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDeviseModel1601641951122 implements MigrationInterface {
  name = "CreateDeviseModel1601641951122";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "devise" ("id" SERIAL NOT NULL, "confirmation_token" character varying, "confirmed_at" TIMESTAMP WITH TIME ZONE, "confirmation_sent_at" TIMESTAMP WITH TIME ZONE, "unconfirmed_email" character varying, "failed_attempts" integer NOT NULL, "locked_at" TIMESTAMP WITH TIME ZONE, "unlock_token" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5f995ce7fd6b1e613eede68213b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4f58945ec4c8943464ae1bd8e0" ON "devise" ("confirmation_token") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_607f33b934b7aaa636a5f89c4e" ON "devise" ("unlock_token") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_607f33b934b7aaa636a5f89c4e"`);
    await queryRunner.query(`DROP INDEX "IDX_4f58945ec4c8943464ae1bd8e0"`);
    await queryRunner.query(`DROP TABLE "devise"`);
  }
}
