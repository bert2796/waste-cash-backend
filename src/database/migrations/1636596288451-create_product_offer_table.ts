/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductOfferTable1636596288451 implements MigrationInterface {
  name = 'createProductOfferTable1636596288451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`productOffers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` float NOT NULL, \`status\` enum ('accepted', 'rejected', 'pending') NOT NULL DEFAULT 'pending', \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`productOffers\` ADD CONSTRAINT \`FK_a1fd6138bda61458ff356100119\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`productOffers\` ADD CONSTRAINT \`FK_39621bfaf513ac8b18022e1fca3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`productOffers\` DROP FOREIGN KEY \`FK_39621bfaf513ac8b18022e1fca3\``);
    await queryRunner.query(`ALTER TABLE \`productOffers\` DROP FOREIGN KEY \`FK_a1fd6138bda61458ff356100119\``);
    await queryRunner.query(`DROP TABLE \`productOffers\``);
  }
}
