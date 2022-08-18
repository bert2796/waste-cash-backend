/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658460551266 implements MigrationInterface {
  name = 'migration1658460551266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`location\` varchar(255) NOT NULL, \`latitude\` varchar(255) NOT NULL, \`longitude\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(128) NOT NULL, \`slug\` varchar(128) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`junkShopName\` varchar(128) NULL, \`firstName\` varchar(128) NOT NULL, \`lastName\` varchar(128) NOT NULL, \`phone\` varchar(128) NOT NULL, \`email\` varchar(128) NOT NULL, \`username\` varchar(128) NOT NULL, \`password\` varchar(128) NOT NULL, \`role\` enum ('buyer', 'seller', 'shop') NOT NULL DEFAULT 'buyer', \`address\` varchar(128) NOT NULL, \`city\` varchar(128) NOT NULL, \`zip\` varchar(128) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`productOffers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` float NOT NULL, \`status\` enum ('accepted', 'rejected', 'pending') NOT NULL DEFAULT 'pending', \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`reviews\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rate\` varchar(255) NOT NULL, \`feedback\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, \`reviewerId\` int NULL, \`revieweeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`name\` varchar(128) NOT NULL, \`price\` float NOT NULL, \`slug\` varchar(128) NOT NULL, \`status\` enum ('sold', 'unsold') NOT NULL DEFAULT 'unsold', \`thumbnail\` varchar(128) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`categoryId\` int NULL, \`ownerId\` int NULL, \`bidderId\` int NULL, \`bidderSetupId\` int NULL, \`reviewId\` int NULL, \`offerId\` int NULL, \`addressId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`bidderSetups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` varchar(128) NOT NULL, \`time\` varchar(128) NOT NULL, \`mop\` enum ('bank_transfer', 'cash', 'gcash') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, \`addressId\` int NULL, UNIQUE INDEX \`REL_310647c3f6d25300a623cfbc91\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`conversationMembers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`conversationId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`isSeen\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`conversationId\` int NULL, \`senderId\` int NULL, \`recipientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`conversations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`event\` varchar(255) NOT NULL, \`isSeen\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, \`fromId\` int NULL, \`toId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`productOffers\` ADD CONSTRAINT \`FK_a1fd6138bda61458ff356100119\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`productOffers\` ADD CONSTRAINT \`FK_39621bfaf513ac8b18022e1fca3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_a6b3c434392f5d10ec171043666\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_f9238c3e3739dc40322f577fc46\` FOREIGN KEY (\`reviewerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_c8f626e1e943aabb0f90fb8ee61\` FOREIGN KEY (\`revieweeId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_b2bdcde548bedcdb7856c36bcf9\` FOREIGN KEY (\`bidderSetupId\`) REFERENCES \`bidderSetups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_43f54827ac11e8ef7190eae81f0\` FOREIGN KEY (\`reviewId\`) REFERENCES \`reviews\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_95e78e75c082cd666bf3a8a0403\` FOREIGN KEY (\`offerId\`) REFERENCES \`productOffers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1c65d28902ed42d878c5570d89a\` FOREIGN KEY (\`addressId\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`bidderSetups\` ADD CONSTRAINT \`FK_310647c3f6d25300a623cfbc919\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`bidderSetups\` ADD CONSTRAINT \`FK_f09b30b6b1959aa6dffeea78e6f\` FOREIGN KEY (\`addressId\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`conversationMembers\` ADD CONSTRAINT \`FK_0dd2a3fc19016c32d71927d9b99\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`conversationMembers\` ADD CONSTRAINT \`FK_500451d64c33e845f0532667515\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_e5663ce0c730b2de83445e2fd19\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_2db9cf2b3ca111742793f6c37ce\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_f548818d46a1315d4e1d5e62da5\` FOREIGN KEY (\`recipientId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`conversations\` ADD CONSTRAINT \`FK_1fbaa33ad249de15b683ffcb110\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(`ALTER TABLE \`conversations\` DROP FOREIGN KEY \`FK_1fbaa33ad249de15b683ffcb110\``);
    await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_f548818d46a1315d4e1d5e62da5\``);
    await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\``);
    await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_e5663ce0c730b2de83445e2fd19\``);
    await queryRunner.query(`ALTER TABLE \`conversationMembers\` DROP FOREIGN KEY \`FK_500451d64c33e845f0532667515\``);
    await queryRunner.query(`ALTER TABLE \`conversationMembers\` DROP FOREIGN KEY \`FK_0dd2a3fc19016c32d71927d9b99\``);
    await queryRunner.query(`ALTER TABLE \`bidderSetups\` DROP FOREIGN KEY \`FK_f09b30b6b1959aa6dffeea78e6f\``);
    await queryRunner.query(`ALTER TABLE \`bidderSetups\` DROP FOREIGN KEY \`FK_310647c3f6d25300a623cfbc919\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1c65d28902ed42d878c5570d89a\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_95e78e75c082cd666bf3a8a0403\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_43f54827ac11e8ef7190eae81f0\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_b2bdcde548bedcdb7856c36bcf9\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_da1482105f8a96c62ac8b7ca2ed\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_663aa9983fd61dfc310d407d4da\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
    await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_c8f626e1e943aabb0f90fb8ee61\``);
    await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_f9238c3e3739dc40322f577fc46\``);
    await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_a6b3c434392f5d10ec171043666\``);
    await queryRunner.query(`ALTER TABLE \`productOffers\` DROP FOREIGN KEY \`FK_39621bfaf513ac8b18022e1fca3\``);
    await queryRunner.query(`ALTER TABLE \`productOffers\` DROP FOREIGN KEY \`FK_a1fd6138bda61458ff356100119\``);
    await queryRunner.query(`DROP TABLE \`notifications\``);
    await queryRunner.query(`DROP TABLE \`conversations\``);
    await queryRunner.query(`DROP TABLE \`messages\``);
    await queryRunner.query(`DROP TABLE \`conversationMembers\``);
    await queryRunner.query(`DROP INDEX \`REL_310647c3f6d25300a623cfbc91\` ON \`bidderSetups\``);
    await queryRunner.query(`DROP TABLE \`bidderSetups\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP TABLE \`reviews\``);
    await queryRunner.query(`DROP TABLE \`productOffers\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(`DROP TABLE \`addresses\``);
  }
}
