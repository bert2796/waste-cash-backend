import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateMessageInputDto } from '../dtos';
import { User } from '../../user/entities/user.entity';
import { Conversation } from '../entities/conversation.entity';
import { ConversationMember } from '../entities/conversationMember.entity';
import { Message } from '../entities/message.entity';
import { ConversationRepository } from '../repositories/conversation.repository';
import { ConversationMemberRepository } from '../repositories/conversationMember.repository';
import { MessageRepository } from '../repositories/message.repository';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly conversationMemberRepository: ConversationMemberRepository,
    private readonly userService: UserService,
    private readonly messageRepository: MessageRepository
  ) {}

  async createMessage(params: { sender: User; input: CreateMessageInputDto }): Promise<Message> {
    const { sender, input } = params;

    let recipient: User;
    let conversation = await this.conversationRepository.findMembersConversation({
      conversationId: input?.conversationId,
      senderId: sender.id,
      recipientId: input?.recipientId,
    });
    if (conversation) {
      recipient = conversation.members.find((member) => member.user.id === input.recipientId)?.user;
      if (!recipient) {
        throw new BadRequestException('Recipient does not exist.');
      }
    } else {
      try {
        recipient = await this.userService.getUser(input.recipientId);
        if (!recipient) {
          throw new Error();
        }
      } catch (error) {
        throw new BadRequestException('Recipient does not exist.');
      }
      conversation = await this.createConversation({ sender, recipient });
    }

    const message = await new Message();
    message.content = input.content;
    message.conversation = conversation;
    message.sender = sender;
    message.recipient = recipient;

    return await this.messageRepository.save(message);
  }

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
}
