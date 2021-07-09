import { PasswordEntity } from 'src/auth/passwords.entity';
import { Repository } from 'typeorm';

export class MockPasswordsRepository extends Repository<PasswordEntity> {
  async findOne() {
    return new PasswordEntity();
  }
}
