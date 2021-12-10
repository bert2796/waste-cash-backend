import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Conversation } from './conversation.entity';

export const publicFields: string[] = ['id', 'content', 'isSeen', 'createdAt', 'updatedAt'];

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'boolean', default: false })
  isSeen: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  updatedAt: Date;

  @ManyToOne(() => Conversation)
  @JoinColumn()
  conversation: Conversation;

  @ManyToOne(() => User)
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn()
  recipient: User;
}
