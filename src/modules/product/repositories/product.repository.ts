import { EntityRepository, Repository } from 'typeorm';

import { publicFields as CATEGORY_PUBLIC_FIELDS } from '../../category/entities/category.entity';
import { User, publicFields as USER_PUBLIC_FIELDS } from '../../user/entities/user.entity';
import { Product, publicFields as PRODUCT_PUBLIC_FIELDS } from '../entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProducts(options: { filter?: Partial<Product>; owner?: User }): Promise<Product[]> {
    const {
      filter: { status, category },
      owner,
    } = options;
    const CATEGORY_ALIAS = 'category';
    const CATEGORY_FIELDS = CATEGORY_PUBLIC_FIELDS.map((field) => `${CATEGORY_ALIAS}.${field}`);
    const OWNER_ALIAS = 'owner';
    const OWNER_FIELDS = USER_PUBLIC_FIELDS.map((field) => `${OWNER_ALIAS}.${field}`);
    const PRODUCT_ALIAS = 'products';
    const PRODUCT_FIELDS = PRODUCT_PUBLIC_FIELDS.map((field) => `${PRODUCT_ALIAS}.${field}`);

    return await this.createQueryBuilder('products')
      .leftJoinAndSelect('products.category', CATEGORY_ALIAS)
      .leftJoinAndSelect('products.owner', OWNER_ALIAS)
      .select([...PRODUCT_FIELDS, ...CATEGORY_FIELDS, ...OWNER_FIELDS])
      .where({
        ...(owner && { owner }),
        ...(status && { status }),
        ...(category && { category }),
      })
      .orderBy({
        'products.createdAt': 'DESC',
        ...(!status && { 'products.status': 'DESC' }),
      })
      .getMany();
  }
}
