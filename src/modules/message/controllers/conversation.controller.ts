import { Controller, Get, HttpCode, HttpStatus, Req, Param, Patch } from '@nestjs/common';

import { IConversationSummary } from '../interfaces';
import { Conversation } from '../entities/conversation.entity';
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

  @Get('/:conversationId')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getConversationByConversationId(
    @Req() req: { user: User },
    @Param('conversationId') conversationId: string
  ): Promise<Conversation> {
    return await this.conversationService.getConversation({ conversationId: +conversationId, includeMessage: true });
  }

  @Get('/recipient/:userId')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getConversationByRecipientId(
    @Req() req: { user: User },
    @Param('userId') recipientId: string
  ): Promise<Conversation> {
    const { user } = req;

    return await this.conversationService.getConversationByRecipient({ recipientId: +recipientId, senderId: user.id });
  }

  @Patch('/:conversationId/seen-all')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async updateConversationMessages(
    @Req() req: { user: User },
    @Param('conversationId') conversationId: string
  ): Promise<Conversation> {
    const { user } = req;

    return await this.conversationService.updateConversationMessages({
      conversationId: +conversationId,
      recipientId: user.id,
    });
  }
}
