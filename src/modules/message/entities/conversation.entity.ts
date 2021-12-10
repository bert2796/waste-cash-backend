import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Product } from '../../product/entities/product.entity';
import { ConversationMember } from './conversationMember.entity';
import { Message } from './message.entity';

export const publicFields: string[] = ['id', 'createdAt', 'updatedAt'];

@Entity({ name: 'conversations' })
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  updatedAt: Date;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @OneToMany(() => ConversationMember, (member) => member.conversation)
  members: ConversationMember[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
