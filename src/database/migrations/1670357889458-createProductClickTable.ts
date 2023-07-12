/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductClickTable1670357889458 implements MigrationInterface {
  name = 'createProductTable1670357889458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`productClicks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`counter\` decimal NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, UNIQUE INDEX \`REL_f522a3e9560057b9fb053bf82b\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`productClicks\` ADD CONSTRAINT \`FK_f522a3e9560057b9fb053bf82b1\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE \`productClicks\` DROP FOREIGN KEY \`FK_f522a3e9560057b9fb053bf82b1\``);
    await queryRunner.query(`DROP INDEX \`REL_f522a3e9560057b9fb053bf82b\` ON \`productClicks\``);
    await queryRunner.query(`DROP TABLE \`productClicks\``);
  }
}
