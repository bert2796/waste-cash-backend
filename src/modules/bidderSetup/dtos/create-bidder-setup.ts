import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { MOP } from '../../../common/constant';
import { CreateAddressInputDto } from '../../address/dtos';

export class CreateBidderSetupInputDto extends CreateAddressInputDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsEnum(MOP)
  mop: MOP;
}
