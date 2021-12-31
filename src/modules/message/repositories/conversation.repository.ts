import { EntityRepository, Repository, getManager } from 'typeorm';

import { IConversationSummary } from '../interfaces';
import { User, publicFields as USER_PUBLIC_FIELDS } from '../../user/entities/user.entity';
import { MessageRepository } from '../repositories/message.repository';
import { Conversation } from '../entities/conversation.entity';
import { ConversationMember } from '../entities/conversationMember.entity';
import { Message, publicFields as MESSAGE_PUBLIC_FIELDS } from '../entities/message.entity';

@EntityRepository(Conversation)
export class ConversationRepository extends Repository<Conversation> {
  constructor(private readonly messageRepository: MessageRepository) {
    super();
  }

  // async findMemberConversations(userId: number): Promise<Conversation[]> {
  //   // const { conversationId, senderId, recipientId } = params;
  //   // return await this.createQueryBuilder('conversations')
  //   //   .leftJoin('conversations.members', 'members')
  //   //   .where('members.user = :senderId')
  //   //   .orWhere('members.user = :recipientId')
  //   //   .setParameters({ senderId, recipientId })
  //   //   .getOne();
  //   // const query = this.createQueryBuilder('conversations').leftJoin('conversations.members', 'members');
  //   // if (conversationId) {
  //   //   query.where({ id: conversationId });
  //   // } else if (senderId && recipientId) {
  //   //   query
  //   //     .where('members.user = :senderId')
  //   //     .orWhere('members.user = :recipientId')
  //   //     .setParameters({ senderId, recipientId });
  //   // }
  //   // return await query.getOne();
  // }

  async getSummary(conversationMembers: ConversationMember[]): Promise<IConversationSummary[]> {
    const CONVERSATION_ALIAS = 'conversation';
    const CONVERSATION_FIELDS = ['id'].map((field) => `${CONVERSATION_ALIAS}.${field}`);
    const LATEST_MESSAGE_ALIAS = 'latest_message';
    const MESSAGE_ALIAS = 'message';
    const MESSAGE_FIELDS = MESSAGE_PUBLIC_FIELDS.map((field) => `${MESSAGE_ALIAS}.${field}`);
    const RECIPIENT_ALIAS = 'recipient';
    const RECIPIENT_FIELDS = USER_PUBLIC_FIELDS.map((field) => `${RECIPIENT_ALIAS}.${field}`);
    const SENDER_ALIAS = 'sender';
    const SENDER_FIELDS = USER_PUBLIC_FIELDS.map((field) => `${SENDER_ALIAS}.${field}`);

    const conversationIds = conversationMembers.map((conversationMember) => conversationMember.conversation.id);
    const latestMessagesQuery = getManager()
      .createQueryBuilder()
      .select('max(id)', 'id')
      .addSelect('conversationId')
      .from(Message, MESSAGE_ALIAS)
      .groupBy('conversationId');
    const conversationsQuery = getManager()
      .createQueryBuilder()
      .select([...CONVERSATION_FIELDS, ...MESSAGE_FIELDS, ...RECIPIENT_FIELDS, ...SENDER_FIELDS])
      .from(Conversation, CONVERSATION_ALIAS)
      .leftJoin(
        `(${latestMessagesQuery.getQuery()})`,
        LATEST_MESSAGE_ALIAS,
        `${LATEST_MESSAGE_ALIAS}.conversationId = ${CONVERSATION_ALIAS}.id`
      )
      .leftJoin(Message, MESSAGE_ALIAS, `${MESSAGE_ALIAS}.id = ${LATEST_MESSAGE_ALIAS}.id`)
      .leftJoin(User, RECIPIENT_ALIAS, `${MESSAGE_ALIAS}.recipientId = ${RECIPIENT_ALIAS}.id`)
      .leftJoin(User, SENDER_ALIAS, `${MESSAGE_ALIAS}.senderId = ${SENDER_ALIAS}.id`)
      .orderBy({ [`${MESSAGE_ALIAS}.createdAt`]: 'DESC' })
      .whereInIds(conversationIds);

    const conversations = await conversationsQuery.getRawMany();
    console.log(conversations);
    const result: IConversationSummary[] = conversations.map((conversation) => ({
      id: conversation.id,
      message: {
        id: conversation.message_id,
        content: conversation.message_content,
        isSeen: conversation.message_isSeen,
        createdAt: conversation.message_createdAt,
      },
      recipient: {
        id: conversation.recipient_id,
        firstName: conversation.recipient_firstName,
        lastName: conversation.recipient_lastName,
      },
      sender: {
        id: conversation.sender_id,
        firstName: conversation.sender_firstName,
        lastName: conversation.sender_lastName,
      },
    }));

    return result;
  }
}
