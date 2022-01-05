import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import {
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
  MockUserFollowingsRepositoryProvider,
  MockUsersRepositoryProvider,
} from 'src/commons/mocks/mock.providers';
import { MockUsersRepository } from 'src/commons/mocks/users.repository.mock';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockUsersRepositoryProvider,
        MockUserFollowingsRepositoryProvider,
        MockPasswordRepositoryProvider,
        MockSessionRepositoryProvider,
        UsersService,
        AuthService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
