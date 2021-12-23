import { EntityRepository, Repository } from 'typeorm';

import { Conversation } from '../entities/conversation.entity';

@EntityRepository(Conversation)
export class ConversationRepository extends Repository<Conversation> {
  async findMembersConversation(params: {
    conversationId?: number;
    senderId?: number;
    recipientId?: number;
  }): Promise<Conversation> {
    const { conversationId, senderId, recipientId } = params;

    // return await this.createQueryBuilder('conversations')
    //   .leftJoin('conversations.members', 'members')
    //   .where('members.user = :senderId')
    //   .orWhere('members.user = :recipientId')
    //   .setParameters({ senderId, recipientId })
    //   .getOne();

    const query = this.createQueryBuilder('conversations').leftJoin('conversations.members', 'members');

    if (conversationId) {
      query.where({ id: conversationId });
    } else if (senderId && recipientId) {
      query
        .where('members.user = :senderId')
        .orWhere('members.user = :recipientId')
        .setParameters({ senderId, recipientId });
    }

    return await query.getOne();
  }
}
