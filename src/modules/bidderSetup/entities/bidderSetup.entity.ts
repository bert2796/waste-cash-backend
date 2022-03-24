import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { MOP } from '../../../common/constant';
import { Product } from '../../product/entities/product.entity';

export const publicFields: string[] = ['id', 'price', 'status', 'createdAt', 'updatedAt'];

@Entity({ name: 'bidderSetups' })
export class BidderSetup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  date: string;

  @Column({ type: 'varchar', length: 128 })
  region: string;

  @Column({ type: 'enum', enum: MOP })
  mop: MOP;

  @CreateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  updatedAt: Date;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}
