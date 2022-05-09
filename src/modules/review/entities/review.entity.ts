import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

export const publicFields: string[] = ['id', 'rate', 'createdAt', 'updatedAt'];

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  rate: string;

  @Column({ type: 'varchar' })
  feedback: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User)
  @JoinColumn()
  reviewer: User;

  @ManyToOne(() => User)
  @JoinColumn()
  reviewee: User;
}
