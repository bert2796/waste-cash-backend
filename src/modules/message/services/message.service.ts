import { BadRequestException, Injectable, Inject, forwardRef } from '@nestjs/common';

import { CreateMessageInputDto } from '../dtos';
import { User } from '../../user/entities/user.entity';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { MessageRepository } from '../repositories/message.repository';
import { ConversationService } from '../services/conversation.service';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class MessageService {
  constructor(
    @Inject(forwardRef(() => ConversationService))
    private readonly conversationService: ConversationService,
    private readonly messageRepository: MessageRepository,
    private readonly userService: UserService
  ) {}

  async createMessage(params: { sender: User; input: CreateMessageInputDto }): Promise<Message> {
    const { sender, input } = params;

    if (sender.id === input.recipientId) {
      throw new BadRequestException('Sender and recipient must not be the same.');
    }

    let recipient: User;
    let conversation: Conversation;

    if (input.conversationId) {
      conversation = await this.conversationService.getConversation({
        conversationId: input.conversationId,
      });
      recipient = conversation.members?.find((member) => member.user.id === input.recipientId)?.user;
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
      conversation = await this.conversationService.createConversation({ sender, recipient });
    }

    const message = await new Message();
    message.content = input.content;
    message.conversation = conversation;
    message.sender = sender;
    message.recipient = recipient;

    return await this.messageRepository.save(message);
  }

  async getMessages(user: User): Promise<void> {
    // const memberConversations = await this.conversationMemberRepository.find({ user });
    // const conversations = await this.conversationRepository.find({
    //   id: In(memberConversations.map((memberConversation) => memberConversation.id)),
    // });
  }

  async getMessageBySenderAndRecipient(params: { senderId: number; recipientId: number }): Promise<Message> {
    const { senderId, recipientId } = params;

    const message = await this.messageRepository.findOne({
      where: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
      ],
      relations: ['conversation'],
    });
    if (!message) {
      throw new BadRequestException('No message found.');
    }

    return message;
  }
}
