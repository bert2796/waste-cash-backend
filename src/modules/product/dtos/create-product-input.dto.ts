import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ProductStatus } from '../../../common/constant';

export class CreateProductInputDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
