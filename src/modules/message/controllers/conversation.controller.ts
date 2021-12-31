import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';

import { IConversationSummary } from '../interfaces';
import { Authorize } from '../../../common/decorators/authorize.decorator';
import { User } from '../../user/entities/user.entity';
import { ConversationService } from '../services/conversation.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getConversations(@Req() req: { user: User }): Promise<IConversationSummary[]> {
    const { user } = req;

    return await this.conversationService.getSummary({ user });
  }
}
