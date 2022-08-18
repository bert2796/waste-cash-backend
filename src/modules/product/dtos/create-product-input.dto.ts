import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { ProductStatus } from '../../../common/constant';
import { CreateAddressInputDto } from '../../address/dtos';

export class CreateProductInputDto extends CreateAddressInputDto {
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
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
