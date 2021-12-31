import { Message } from '../entities/message.entity';
import { User } from '../../user/entities/user.entity';

export interface IConversationSummary {
  id: number;
  message: Partial<Message>;
  recipient: Partial<User>;
  sender: Partial<User>;
}
