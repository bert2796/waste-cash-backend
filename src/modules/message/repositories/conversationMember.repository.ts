import { EntityRepository, Repository } from 'typeorm';

import { ConversationMember } from '../entities/conversationMember.entity';

@EntityRepository(ConversationMember)
export class ConversationMemberRepository extends Repository<ConversationMember> {}
