/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMessageTable1640312840136 implements MigrationInterface {
  name = 'createMessageTable1640312840136';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`isSeen\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), \`conversationId\` int NULL, \`senderId\` int NULL, \`recipientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_f548818d46a1315d4e1d5e62da5\``);
    await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\``);
    await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_e5663ce0c730b2de83445e2fd19\``);
    await queryRunner.query(`DROP TABLE \`messages\``);
  }
}
