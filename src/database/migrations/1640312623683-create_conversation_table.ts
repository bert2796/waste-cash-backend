/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createConversationTable1640312623683 implements MigrationInterface {
  name = 'createConversationTable1640312623683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`conversations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`conversations\` ADD CONSTRAINT \`FK_1fbaa33ad249de15b683ffcb110\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`conversations\` DROP FOREIGN KEY \`FK_1fbaa33ad249de15b683ffcb110\``);

    await queryRunner.query(`DROP TABLE \`conversations\``);
  }
}
