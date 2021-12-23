import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateMessageInputDto {
  @IsOptional()
  @IsNumber()
  conversationId: number;

  @IsOptional()
  @IsNumber()
  recipientId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
