import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationInputDto {
  @IsNotEmpty()
  @IsString()
  event: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
