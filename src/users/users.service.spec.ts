import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { PasswordEntity } from 'src/auth/passwords.entity';
import { MockPasswordsRepository } from 'src/commons/mocks/passwords.repository.mock';
import { MockUsersRepository } from 'src/commons/mocks/users.repository.mock';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: getCustomRepositoryToken(UsersRepository),
          useClass: MockUsersRepository,
        },
        {
          provide: getRepositoryToken(PasswordEntity),
          useClass: MockPasswordsRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
