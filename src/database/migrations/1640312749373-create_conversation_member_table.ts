/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createConversationMemberTable1640312749373 implements MigrationInterface {
  name = 'createConversationMemberTable1640312749373';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`conversationMembers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` timestamp(6) NOT NULL DEFAULT (CURRENT_DATE) ON UPDATE CURRENT_TIMESTAMP(6), \`conversationId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`conversationMembers\` ADD CONSTRAINT \`FK_0dd2a3fc19016c32d71927d9b99\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`conversationMembers\` ADD CONSTRAINT \`FK_500451d64c33e845f0532667515\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`conversationMembers\` DROP FOREIGN KEY \`FK_500451d64c33e845f0532667515\``);
    await queryRunner.query(`ALTER TABLE \`conversationMembers\` DROP FOREIGN KEY \`FK_0dd2a3fc19016c32d71927d9b99\``);

    await queryRunner.query(`DROP TABLE \`conversationMembers\``);
  }
}
