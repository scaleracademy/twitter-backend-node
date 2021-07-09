import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUsersRepositoryProvider } from 'src/commons/mocks/mock.providers';
import { AuthService } from './auth.service';
import { PasswordEntity } from './passwords.entity';
import { SessionsEntity } from './sessions.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        MockUsersRepositoryProvider,
        {
          provide: getRepositoryToken(PasswordEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(SessionsEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
