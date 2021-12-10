import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConversationRepository } from './repositories/conversation.repository';
import { ConversationMemberRepository } from './repositories/conversationMember.repository';
import { MessageRepository } from './repositories/message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationRepository, ConversationMemberRepository, MessageRepository])],
  controllers: [],
  providers: [],
  exports: [],
})
export class MessageModule {}
