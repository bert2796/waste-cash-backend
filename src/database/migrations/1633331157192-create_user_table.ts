import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1633331157192 implements MigrationInterface {
  name = 'createUserTable1633331157192';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(128) NOT NULL, \`lastName\` varchar(128) NOT NULL, \`phone\` varchar(128) NOT NULL, \`email\` varchar(128) NOT NULL, \`username\` varchar(128) NOT NULL, \`password\` varchar(128) NOT NULL, \`role\` enum ('buyer', 'seller', 'shop') NOT NULL DEFAULT 'buyer', \`address\` varchar(128) NOT NULL, \`city\` varchar(128) NOT NULL, \`zip\` varchar(128) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
