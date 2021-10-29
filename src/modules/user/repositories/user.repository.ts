import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneByEmailOrUsername(email: string, username: string): Promise<User> {
    return this.findOne({ where: [{ email }, { username }] });
  }
}
