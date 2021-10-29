import { ProductStatus } from '../../../common/constant';

export interface IProduct {
  description: string;
  name: string;
  price: number;
  slug: string;
  status: ProductStatus;
  thumbnail: string;
}
