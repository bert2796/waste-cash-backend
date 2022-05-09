import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { MOP } from '../../../common/constant';
import { Product } from '../../product/entities/product.entity';
import { Address } from '../../address/entities/address.entity';

export const publicFields: string[] = ['id', 'price', 'status', 'createdAt', 'updatedAt'];

@Entity({ name: 'bidderSetups' })
export class BidderSetup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  date: string;

  @Column({ type: 'varchar', length: 128 })
  time: string;

  @Column({ type: 'enum', enum: MOP })
  mop: MOP;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Address)
  @JoinColumn()
  address: Address;
}
