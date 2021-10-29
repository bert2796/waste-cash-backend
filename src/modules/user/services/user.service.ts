import { Injectable } from '@nestjs/common';

import { CreateUserInputDto } from '../dtos';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserInputDto): Promise<User> {
    const { firstName, lastName, phone, email, username, password, role, address, city, zip } = input;
    let user = await this.userRepository.findOneByEmailOrUsername(email, username);
    if (user) {
      throw new Error('User is already existing.');
    }

    user = new User();
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

  async getUser(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async validateUsernameAndPassword(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneByEmailOrUsername(username, username);
    if (!user || !(await user.isSamePassword(password))) {
      throw new Error('User does not exist.');
    }

    return user;
  }
}
