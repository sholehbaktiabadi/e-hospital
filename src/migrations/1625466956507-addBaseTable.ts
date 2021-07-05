import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBaseTable1625466956507 implements MigrationInterface {
  name = 'addBaseTable1625466956507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "doctor" ("id" BIGSERIAL NOT NULL, "name" character varying(60) NOT NULL, "title" character varying(60) NOT NULL, "spesialis" text, "phone_number" character varying(60) NOT NULL, "npa" character varying(60), "created_at" TIMESTAMP NOT NULL DEFAULT '"2021-07-05T06:36:02.472Z"', CONSTRAINT "UQ_7414969d70fad3b146f43c6dca3" UNIQUE ("npa"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_account" ("id" BIGSERIAL NOT NULL, "username" character varying(60) NOT NULL, "password" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "phone_number" character varying(60) NOT NULL, "is_verified" character varying(60) DEFAULT false, CONSTRAINT "UQ_3c4d4fae641bf9048ad324ee0d9" UNIQUE ("username"), CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_pin" ("id" BIGSERIAL NOT NULL, "user_pin" character varying(6), "created_at" TIMESTAMP NOT NULL, "user_id" bigint NOT NULL, CONSTRAINT "REL_c1215708e3b1fade86710a922d" UNIQUE ("user_id"), CONSTRAINT "PK_5f7e4bef9610191849c5ca06f3e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_pin" ADD CONSTRAINT "FK_c1215708e3b1fade86710a922df" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_pin" DROP CONSTRAINT "FK_c1215708e3b1fade86710a922df"`,
    );
    await queryRunner.query(`DROP TABLE "user_pin"`);
    await queryRunner.query(`DROP TABLE "user_account"`);
    await queryRunner.query(`DROP TABLE "doctor"`);
  }
}
