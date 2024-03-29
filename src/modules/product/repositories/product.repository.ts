import { EntityRepository, Repository, IsNull } from 'typeorm';

import { publicFields as ADDRESS_PUBLIC_FIELDS } from '../../address/entities/address.entity';
import { publicFields as CATEGORY_PUBLIC_FIELDS } from '../../category/entities/category.entity';
import { User, publicFields as USER_PUBLIC_FIELDS } from '../../user/entities/user.entity';
import { Product, publicFields as PRODUCT_PUBLIC_FIELDS } from '../entities/product.entity';
// import { Review, publicFields as REVIEW_PUBLIC_FIELDS } from '../../review/entities/review.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProducts(options: { filter?: Partial<Product>; owner?: User }): Promise<Product[]> {
    const {
      filter: { status, category },
      owner,
    } = options;
    const ADDRESS_ALIAS = 'address';
    const ADDRES_FIELDS = ADDRESS_PUBLIC_FIELDS.map((field) => `${ADDRESS_ALIAS}.${field}`);
    const CATEGORY_ALIAS = 'category';
    const CATEGORY_FIELDS = CATEGORY_PUBLIC_FIELDS.map((field) => `${CATEGORY_ALIAS}.${field}`);
    const OWNER_ALIAS = 'owner';
    const OWNER_FIELDS = USER_PUBLIC_FIELDS.map((field) => `${OWNER_ALIAS}.${field}`);
    const PRODUCT_ALIAS = 'products';
    const PRODUCT_FIELDS = PRODUCT_PUBLIC_FIELDS.map((field) => `${PRODUCT_ALIAS}.${field}`);
    // const REVIEW_ALIAS = 'reviews';
    // const REVIEW_FIELDS = REVIEW_PUBLIC_FIELDS.map((field) => ``);

    return await this.createQueryBuilder(PRODUCT_ALIAS)
      .leftJoinAndSelect('products.address', ADDRESS_ALIAS)
      .leftJoinAndSelect('products.category', CATEGORY_ALIAS)
      .leftJoinAndSelect('products.owner', OWNER_ALIAS)
      .select([...ADDRES_FIELDS, ...PRODUCT_FIELDS, ...CATEGORY_FIELDS, ...OWNER_FIELDS])
      .where({
        deletedAt: IsNull(),
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
