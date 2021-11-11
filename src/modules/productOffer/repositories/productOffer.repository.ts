import { EntityRepository, Repository } from 'typeorm';

import { ProductOffer } from '../entities/productOffer.entity';

@EntityRepository(ProductOffer)
export class ProductOfferRepository extends Repository<ProductOffer> {}
