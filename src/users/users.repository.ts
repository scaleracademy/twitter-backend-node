import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './users.entity';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {}
