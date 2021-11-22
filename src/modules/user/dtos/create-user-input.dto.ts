import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

import { UserRoles } from '../../../common/constant';

export class CreateUserInputDto {
  @ValidateIf((o) => o.role === UserRoles.SHOP)
  @IsNotEmpty()
  @IsString()
  junkShopName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  zip: string;
}
