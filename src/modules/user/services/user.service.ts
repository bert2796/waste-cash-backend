import { Injectable } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';

import { UserRoles } from '../../../common/constant';
import { CreateUserInputDto } from '../dtos';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserInputDto): Promise<User> {
    const { junkShopName, firstName, lastName, phone, email, username, password, role, address, city, zip } = input;
    let user = await this.userRepository.findOneByEmailOrUsername(email, username);
    if (user) {
      throw new Error('User is already existing.');
    }

    user = new User();
    user.junkShopName = role === UserRoles.SHOP ? junkShopName : null;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.email = email;
    user.username = username;
    user.password = password;
    user.role = role;
    user.address = address;
    user.city = city;
    user.zip = zip;

    return await this.userRepository.save(user);
  }

  async updateUser(params: { user: User; input: Partial<User> }): Promise<User> {
    const { user, input } = params;

    user.firstName = input.firstName || user.firstName;
    user.lastName = input.lastName || user.lastName;
    user.address = input.address || user.address;
    user.city = input.city || user.city;
    user.zip = input.zip || user.zip;
    user.phone = input.phone || user.phone;

    return await this.userRepository.save(user);
  }

  async getUser(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async getJunkShopUsers(): Promise<User[]> {
    return await this.userRepository.find({ junkShopName: Not(IsNull()) });
  }

  async validateUsernameAndPassword(params: { username: string; password: string }): Promise<User> {
    const { username, password } = params;
    const user = await this.userRepository.findOneByEmailOrUsername(username, username);
    if (!user || !(await user.isSamePassword(password))) {
      throw new Error('User does not exist.');
    }

    return user;
  }
}
