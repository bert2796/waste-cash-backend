import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductOfferInputDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
