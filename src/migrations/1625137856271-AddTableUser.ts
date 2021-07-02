import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableUser1625137856271 implements MigrationInterface {
  name = 'AddTableUser1625137856271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "username" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(60) NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
