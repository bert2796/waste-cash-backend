import { BadRequestException, Injectable, Inject, forwardRef } from '@nestjs/common';

import { IConversationSummary } from '../interfaces';
import { User } from '../../user/entities/user.entity';
import { Conversation } from '../entities/conversation.entity';
import { ConversationMember } from '../entities/conversationMember.entity';
import { ConversationRepository } from '../repositories/conversation.repository';
import { ConversationMemberRepository } from '../repositories/conversationMember.repository';
import { MessageService } from '../services/message.service';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
    private readonly conversationRepository: ConversationRepository,
    private readonly conversationMemberRepository: ConversationMemberRepository
  ) {}

  async createConversation(params: { sender: User; recipient: User }): Promise<Conversation> {
    const conversation = await this.conversationRepository.save(await new Conversation());

    // sender
    const senderMember = await new ConversationMember();
    senderMember.conversation = conversation;
    senderMember.user = params.sender;
    await this.conversationMemberRepository.save(senderMember);

    // recipient
    const recipientMember = await new ConversationMember();
    recipientMember.conversation = conversation;
    recipientMember.user = params.recipient;
    await this.conversationMemberRepository.save(recipientMember);

    return conversation;
  }

  async getConversation(params: { conversationId: number; includeMessage?: boolean }): Promise<Conversation> {
    const { conversationId, includeMessage } = params;

    const conversation = await this.conversationRepository.getConversationWithMessages({
      conversationId,
      includeMembers: true,
      includeMessages: includeMessage,
    });
    if (!conversation) {
      throw new BadRequestException('Conversation does not exist.');
    }

    return conversation;
  }

  async getConversationByShop(params: { recipientId: number; senderId: number }): Promise<Conversation> {
    const { recipientId, senderId } = params;

    let conversation;
    try {
      const message = await this.messageService.getMessageBySenderAndRecipient({ recipientId, senderId });
      if (message) {
        conversation = await this.conversationRepository.getConversationWithMessages({
          conversationId: message.conversation.id,
          includeMessages: true,
        });
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Conversation does not exist.');
    }

    if (!conversation) {
      throw new BadRequestException('Conversation does not exist.');
    }

    return conversation;
  }

  async getSummary(params: { user: User }): Promise<IConversationSummary[]> {
    const { user } = params;
    const memberConversations = await this.conversationMemberRepository.find({
      where: { user },
      relations: ['conversation', 'user'],
    });

    return await this.conversationRepository.getSummary(memberConversations);
  }
}
