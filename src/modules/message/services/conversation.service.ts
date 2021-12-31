import { BadRequestException, Injectable } from '@nestjs/common';

import { IConversationSummary } from '../interfaces';
import { User } from '../../user/entities/user.entity';
import { Conversation } from '../entities/conversation.entity';
import { ConversationMember } from '../entities/conversationMember.entity';
import { ConversationRepository } from '../repositories/conversation.repository';
import { ConversationMemberRepository } from '../repositories/conversationMember.repository';

@Injectable()
export class ConversationService {
  constructor(
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
    const relations = ['members', 'members.user'];

    if (includeMessage) {
      relations.push('messages');
    }

    const conversation = await this.conversationRepository.findOne(conversationId, {
      relations,
    });
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
