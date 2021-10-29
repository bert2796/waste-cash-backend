import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcrypt';

import { UserRoles } from '../../../common/constant';
import { IUser } from '../interfaces';

export const publicFields: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zip'];

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  firstName: string;

  @Column({ type: 'varchar', length: 128 })
  lastName: string;

  @Column({ type: 'varchar', length: 128 })
  phone: string;

  @Column({ type: 'varchar', length: 128 })
  email: string;

  @Column({ type: 'varchar', length: 128 })
  username: string;

  @Column({ type: 'varchar', length: 128 })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.BUYER })
  role: UserRoles;

  @Column({ type: 'varchar', length: 128 })
  address: string;

  @Column({ type: 'varchar', length: 128 })
  city: string;

  @Column({ type: 'varchar', length: 128 })
  zip: string;

  @CreateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => '(CURRENT_DATE)' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt());
  }

  async isSamePassword(passwordToCompare: string): Promise<boolean> {
    return await bcrypt.compare(passwordToCompare, this.password);
  }
}
