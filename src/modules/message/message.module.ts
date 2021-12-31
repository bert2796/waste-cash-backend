import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { ConversationsController } from './controllers/conversation.controller';
import { MessageController } from './controllers/message.controller';
import { ConversationRepository } from './repositories/conversation.repository';
import { ConversationMemberRepository } from './repositories/conversationMember.repository';
import { MessageRepository } from './repositories/message.repository';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConversationRepository, ConversationMemberRepository, MessageRepository]),
    UserModule,
  ],
  controllers: [ConversationsController, MessageController],
  providers: [ConversationService, MessageService],
  exports: [],
})
export class MessageModule {}
