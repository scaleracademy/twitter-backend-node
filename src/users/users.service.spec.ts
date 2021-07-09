import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { PasswordEntity } from 'src/auth/passwords.entity';
import { SessionsEntity } from 'src/auth/sessions.entity';
import { MockUsersRepositoryProvider } from 'src/commons/mocks/mock.providers';
import { MockPasswordsRepository } from 'src/commons/mocks/passwords.repository.mock';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        MockUsersRepositoryProvider,
        {
          provide: getRepositoryToken(PasswordEntity),
          useClass: MockPasswordsRepository,
        },
        {
          provide: getRepositoryToken(SessionsEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
