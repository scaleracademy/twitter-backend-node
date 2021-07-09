import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUsersRepositoryProvider } from 'src/commons/mocks/mock.providers';
import { MockPasswordsRepository } from 'src/commons/mocks/passwords.repository.mock';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordEntity } from './passwords.entity';
import { SessionsEntity } from './sessions.entity';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
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

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
