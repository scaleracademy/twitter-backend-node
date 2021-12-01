import { PasswordEntity } from 'src/auth/passwords.entity';
import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';

export class MockUsersRepository extends Repository<UserEntity> {
  async findOne() {
    const mockUser: UserEntity = {
      id: 'test-uuid',
      name: 'John Doe',
      followeeCount: 1,
      followerCount: 1,
      updatedAt: new Date('2020-01-01'),
      createdAt: new Date('2020-01-01'),
      username: 'johndoe',
      verified: true,
      userPassword: new PasswordEntity(),
    };
    return mockUser;
  }
}
