/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBidderSetupTable1646956622954 implements MigrationInterface {
  name = 'createBidderSetupTable1646956622954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bidderSetups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` varchar(128) NOT NULL, \`region\` varchar(128) NOT NULL, \`mop\` enum ('bank_transfer', 'cash', 'gcash') NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, UNIQUE INDEX \`REL_310647c3f6d25300a623cfbc91\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(`ALTER TABLE \`products\` ADD \`bidderSetupId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_b2bdcde548bedcdb7856c36bcf9\` FOREIGN KEY (\`bidderSetupId\`) REFERENCES \`bidderSetups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`bidderSetups\` ADD CONSTRAINT \`FK_310647c3f6d25300a623cfbc919\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`bidderSetups\` DROP FOREIGN KEY \`FK_310647c3f6d25300a623cfbc919\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_b2bdcde548bedcdb7856c36bcf9\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`bidderSetupId\``);
    await queryRunner.query(`DROP INDEX \`REL_310647c3f6d25300a623cfbc91\` ON \`bidderSetups\``);
    await queryRunner.query(`DROP TABLE \`bidderSetups\``);
  }
}
