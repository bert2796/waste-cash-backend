import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserAddJunkShopNameCol1637544185949 implements MigrationInterface {
  name = 'updateUserAddJunkShopNameCol1637544185949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`junkShopName\` varchar(128) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`junkShopName\``);
  }
}
