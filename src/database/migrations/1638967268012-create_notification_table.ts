/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNotificationTable1638967268012 implements MigrationInterface {
  name = 'createNotificationTable1638967268012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`event\` varchar(255) NOT NULL, \`isSeen\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, \`fromId\` int NULL, \`toId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_f10748c31204fbb4ab4219efc98\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_d5b09649933088707dcc1593313\` FOREIGN KEY (\`fromId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_f79957ad6239e200b00ab1c6ce0\` FOREIGN KEY (\`toId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_f79957ad6239e200b00ab1c6ce0\``);
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_d5b09649933088707dcc1593313\``);
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_f10748c31204fbb4ab4219efc98\``);
    await queryRunner.query(`DROP TABLE \`notifications\``);
  }
}
