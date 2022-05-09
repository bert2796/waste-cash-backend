import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateReviewInputDto {
  @IsNotEmpty()
  @IsString()
  rate: string;

  @IsOptional()
  @IsString()
  feedback: string;
}
