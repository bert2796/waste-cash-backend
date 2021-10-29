import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthInputDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
