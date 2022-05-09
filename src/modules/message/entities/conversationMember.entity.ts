import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Conversation } from './conversation.entity';

export const publicFields: string[] = ['id', 'createdAt', 'updatedAt'];

@Entity({ name: 'conversationMembers' })
export class ConversationMember {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Conversation)
  @JoinColumn()
  conversation: Conversation;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
