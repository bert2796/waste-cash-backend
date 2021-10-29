/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductTable1633484871271 implements MigrationInterface {
  name = 'createProductTable1633484871271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`name\` varchar(128) NOT NULL, \`price\` float NOT NULL, \`slug\` varchar(128) NOT NULL, \`status\` enum ('sold', 'unsold') NOT NULL DEFAULT 'unsold', \`thumbnail\` varchar(128) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` int NULL, \`ownerId\` int NULL, \`bidderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_663aa9983fd61dfc310d407d4da\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_da1482105f8a96c62ac8b7ca2ed\` FOREIGN KEY (\`bidderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_da1482105f8a96c62ac8b7ca2ed\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_663aa9983fd61dfc310d407d4da\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
    await queryRunner.query(`DROP TABLE \`products\``);
  }
}
