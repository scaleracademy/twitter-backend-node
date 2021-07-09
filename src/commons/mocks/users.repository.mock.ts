import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';

export class MockUsersRepository extends Repository<UserEntity> {
  async findOne() {
    return new UserEntity();
  }
}
