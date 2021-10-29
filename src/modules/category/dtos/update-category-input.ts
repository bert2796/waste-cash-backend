import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryInputDto {
  @IsOptional()
  @IsString()
  name: string;
}
