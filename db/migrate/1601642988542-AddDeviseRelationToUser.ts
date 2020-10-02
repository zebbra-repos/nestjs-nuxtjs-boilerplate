import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeviseRelationToUser1601642988542
  implements MigrationInterface {
  name = "AddDeviseRelationToUser1601642988542";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "deviseId" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_c106f8454c2887866fae69cd15c" UNIQUE ("deviseId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c106f8454c2887866fae69cd15c" FOREIGN KEY ("deviseId") REFERENCES "devise"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c106f8454c2887866fae69cd15c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_c106f8454c2887866fae69cd15c"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deviseId"`);
  }
}
