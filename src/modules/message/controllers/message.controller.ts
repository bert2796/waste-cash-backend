import { Controller, Post, HttpCode, HttpStatus, Req, Body } from '@nestjs/common';

import { Authorize } from '../../../common/decorators/authorize.decorator';
import { User } from '../../user/entities/user.entity';
import { CreateMessageInputDto } from '../dtos';
import { Message } from '../entities/message.entity';
import { MessageService } from '../services/message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async updateNotifications(@Req() req: { user: User }, @Body() input: CreateMessageInputDto): Promise<Message> {
    const sender = req.user;

    return await this.messageService.createMessage({ sender, input });
  }
}
