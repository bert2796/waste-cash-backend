import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ProductOfferStatus } from '../../../common/constant';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

export const publicFields: string[] = ['id', 'price', 'status', 'createdAt', 'updatedAt'];

@Entity({ name: 'productOffers' })
export class ProductOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'enum', enum: ProductOfferStatus, default: ProductOfferStatus.PENDING })
  status: ProductOfferStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  updatedAt: Date;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
