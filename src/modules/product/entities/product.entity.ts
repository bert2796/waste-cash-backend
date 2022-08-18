import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Address } from '../../address/entities/address.entity';
import { ProductStatus } from '../../../common/constant';
import { BidderSetup } from '../../bidderSetup/entities/bidderSetup.entity';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { ProductOffer } from '../../productOffer/entities/productOffer.entity';
import { Review } from '../../review/entities/review.entity';

export const publicFields: string[] = [
  'id',
  'description',
  'name',
  'price',
  'status',
  'thumbnail',
  'createdAt',
  'updatedAt',
  'deletedAt',
];

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'varchar', length: 128 })
  slug: string;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.UNSOLD })
  status: ProductStatus;

  @Column({ type: 'varchar', length: 128 })
  thumbnail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Category)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;

  @ManyToOne(() => User)
  @JoinColumn()
  bidder: User;

  @ManyToOne(() => BidderSetup)
  @JoinColumn()
  bidderSetup: BidderSetup;

  @ManyToOne(() => Review, (review) => review.product)
  review: Review;

  @OneToMany(() => ProductOffer, (offer) => offer.product)
  offers: ProductOffer[];

  @ManyToOne(() => ProductOffer)
  @JoinColumn()
  offer: ProductOffer;

  @ManyToOne(() => Address)
  @JoinColumn()
  address: Address;
}
