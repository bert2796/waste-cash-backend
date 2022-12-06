import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Product } from '../../product/entities/product.entity';

export const publicFields: string[] = ['id', 'counter', 'createdAt', 'updatedAt'];

@Entity({ name: 'productClicks' })
export class ProductClick {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  counter: number;

  @CreateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  updatedAt: Date;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}
